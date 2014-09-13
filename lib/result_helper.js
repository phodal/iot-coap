function resultReturn() {
    'use strict';
    return;
}
resultReturn.saveAndCode = function (block, res) {
    'use strict';
    res.code = '2.05';
    res.end({});
};

resultReturn.deleteAndCode = function (block, res) {
    'use strict';
    res.code = '2.05';
    res.end(JSON.stringify({
        success: "delete"
    }));
};

resultReturn.jsonAndCode = function (result, res) {
    'use strict';
    if (result.length === 2) {
        res.code = '4.04';
        res.end(JSON.stringify({
            error: "Not Found"
        }));
    } else {
        res.code = '2.05';
        res.end(result);
    }
};

module.exports = resultReturn;