var config          = require('../../iot').config;
var MongoClient     = require('mongodb').MongoClient;
var mongodb_url     = 'mongodb://127.0.0.1:27017/' + config.mongodb_name.toString();
var _               = require("underscore");
var URLHandler      = require("../url_handler");
var IOT_DB          = require("./iot_db");

function MongoDBHelper() {
    'use strict';
}

function generateQuery(url) {
    'use strict';
    var query = {};
    var element = URLHandler.getKeyFromURL(url).toString();
    var element_value = URLHandler.getValueFromURL(url);
    query[element] = parseInt(element_value, 10);
    return query;
}

MongoDBHelper.prototype = new IOT_DB();

MongoDBHelper.prototype.parseData = function (data) {
    'use strict';
    function generateDBValue(this_block) {
        var str = [];
        _.each(this_block, function (key) {
            str.push((typeof key === "object" || isNaN(key)) ? key : parseInt(key, 10));
        });
        return str;
    }

    function generateDBMap(value) {
        var result = {};
        _.each(config.keys, function (key, index) {
            result[key] = value[index];
        });
        return result;
    }

    return generateDBMap(generateDBValue(data));
};

MongoDBHelper.prototype.deleteData = function (url, callback) {
    'use strict';
    MongoClient.connect(mongodb_url, function (err, db) {
        MongoDBHelper.prototype.errorHandler(err);

        var removeDocuments = function (db, mongodb_callback) {
            var collection = db.collection(config.mongodb_documents);
            var query = generateQuery(url);
            collection.remove(query, function (err, result) {
                mongodb_callback(result);
            });
        };

        removeDocuments(db, function (docs) {
            delete docs._id;
            db.close();
            callback(docs);
        });
    });
};

MongoDBHelper.prototype.getData = function (url, callback) {
    'use strict';
    MongoClient.connect(mongodb_url, function (err, db) {
        MongoDBHelper.prototype.errorHandler(err, callback);

        var findDocuments = function (db, mongo_callback) {
            var collection = db.collection(config.mongodb_documents);
            var query = generateQuery(url);
            collection.find(query).toArray(function (err, docs) {
                mongo_callback(docs);
            });
        };
        findDocuments(db, function (docs) {
            delete docs._id;
            db.close();
            callback(JSON.stringify(docs));
        });
    });
};

MongoDBHelper.prototype.postData = function (block, callback) {
    'use strict';
    var convertedData = MongoDBHelper.prototype.parseData(block);

    MongoClient.connect(mongodb_url, function (err, db) {
        MongoDBHelper.prototype.errorHandler(err, callback);

        var updateDocument = function (db, mongodb_callback) {
            var collection = db.collection(config.mongodb_documents);
            collection.update({}, { $set: convertedData}, function (err, docs) {
                mongodb_callback(docs);
            });
        };

        updateDocument(db, function (docs) {
            delete docs._id;
            db.close();
            callback(JSON.stringify(docs));
        });
    });
};

MongoDBHelper.prototype.init = function (callback) {
    'use strict';
    MongoClient.connect(mongodb_url, function (err, db) {
        MongoDBHelper.prototype.errorHandler(err, callback);

        var insertDocuments = function (db, callback) {
            var collection = db.collection(config.mongodb_documents);
            collection.insert(config.mongodb_init, function (err, docs) {
                callback(docs);
            });
        };

        var findDocuments = function (db, callback) {
            var collection = db.collection(config.mongodb_documents);
            collection.find(config.mongodb_init[0]).toArray(function (err, docs) {
                if (_.isEmpty(docs)) {
                    insertDocuments(db, function () {
                        db.close();
                    });
                }
                callback(docs);
            });
        };
        findDocuments(db, function () {
            db.close();
        });
    });
};

module.exports = MongoDBHelper;

