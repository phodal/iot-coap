function resultReturn() {
    'use strict';
    return;
}

resultReturn.returnPOSTStatus = function (block, res) {
    'use strict';
    res.code = '2.05';
    res.end(JSON.stringify({
        success: "post"
    }));
};

resultReturn.returnDeleteStatus = function (block, res) {
    'use strict';
    res.code = '2.05';
    res.end(JSON.stringify({
        success: "delete"
    }));
};

resultReturn.returnGETStatus = function (result, res, req) {
    'use strict';
    if (result !== undefined) {
        if (result.length === 2) {
            res.code = '4.04';
            res.end(JSON.stringify({
                error: "Not Found this id"
            }));
        } else {
            res.code = '2.05';
            res.end(result);
        }
    } else {
        res.code = '4.04';
        res.end(JSON.stringify({
            error: "Require URL is :" + req.url + ", URL Error"
        }));
    }

};

module.exports = resultReturn;