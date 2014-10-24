function IOT_DB() {
    'use strict';
    return;
}

IOT_DB.prototype.errorHandler = function (err) {
    'use strict';
    if (err !== null) {
        throw err;
    }
};

module.exports = IOT_DB;