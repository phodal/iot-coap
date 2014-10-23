function IOT_DB() {
    'use strict';
    return;
}

IOT_DB.prototype.errorHandler = function (err, callback) {
    'use strict';
    if (err !== null) {
        callback(err);
        throw err;
    }
};

IOT_DB.prototype.init = function () {
    'use strict';
    return;
};

IOT_DB.prototype.getData = function () {
    'use strict';
    return;
};

IOT_DB.prototype.postData = function () {
    'use strict';
    return;
};

IOT_DB.prototype.deleteData = function () {
    'use strict';
    return;
};

IOT_DB.prototype.parseData = function () {
    'use strict';
    return;
};

module.exports = IOT_DB;