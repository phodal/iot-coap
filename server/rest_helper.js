const db_helper = require('./db_helper.js')
	  ,_			= require("underscore");

function rest_helper(){

}

rest_helper.post_id = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(e);
		console.log('post_id: ' + e);
		next();
	})
};

rest_helper.put_id = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(e);
		console.log('put_id: ' + e);
		next();
	})
};

rest_helper.get_id = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(e);
		console.log('get_id: ' + e);
		next();
	})
};

rest_helper.del_id = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(e);
		console.log('del_id: ' + e);
		next();
	})
};

rest_helper.get_ids = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(e);
		console.log('get_ids: ' + e);
		next();
	})
};

rest_helper.response = function(req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(JSON.parse(e));
		next();
	})
};

rest_helper.get_response = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(e);
		console.log('get_response: ' + e);
		next();
	})
};

rest_helper.post_response = function (req, res, next) {
	var data=[];
	_.each((req.params), function(key,value){
		if(typeof key === "string"){
			key = "'" + key + "'";
		}
		data.push(key);
	});
	db_helper.syncData(data, function(e){
		res.send({});
		next();
	})
};


rest_helper.del_response = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(JSON.parse(e));
		next();
	})
};

module.exports = rest_helper;