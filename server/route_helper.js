var url = require('url');

function matchURL(re, req) {
    var i = 0;
    var result = re.exec(req);
    var params = {};

    if (!result)
        return (false);

    // This means the user original specified a regexp match, not a url
    // string like /:foo/:bar
    if (!re.restParams) {
        for (i = 1; i < result.length; i++)
            params[(i - 1)] = result[i];

        return (params);
    }

    // This was a static string, like /foo
    if (re.restParams.length === 0)
        return (params);

    // This was the "normal" case, of /foo/:id
    re.restParams.forEach(function (p) {
        if (++i < result.length)
            params[p] = decodeURIComponent(result[i]);
    });

    return (params);
}

function compileURL(path) {
    if (path instanceof RegExp)
        return (path);

    var params = [];
    var pattern = '^';
    var re;
    var _url = url.parse(path).pathname;
    _url.split('/').forEach(function (frag) {
        if (frag.length <= 0)
            return (false);

        pattern += '\\/+';
        if (frag.charAt(0) === ':') {
            pattern += '([^/]*)';
            params.push(frag.slice(1));
        } else {
            pattern += frag;
        }

        return (true);
    });

    if (pattern === '^')
        pattern += '\\/';
    pattern += '$';

    re = new RegExp(pattern);
    re.restParams = params;

    return (re);
}
routes = {};
function route_helper() {
}

['del', 'get', 'post', 'put'].forEach(function (method) {
    routes[method] = [];
    route_helper[method] = function (path, action) {
        var re = compileURL(path);
        routes[method].push([re, action]);
    };
});

route_helper.handle = function(req, res, callback) {
    var params;
    var method = req.method.toLowerCase();
    if (method === 'delete') {
        method = 'del'
    }
    var routes_method = routes[method] || [];

    for (var i = 0; i < routes_method.length; i++) {
        try {
            var route = routes_method[i];
            params = matchURL(route[0], req.url);
        } catch (e) {
            callback(e.message);
            return false;
        }

        if (params === false)
            continue;

        var action = route[1];
        action(req, res);
        return true;
    }

    callback('resource not exist:' +  req.url);
    return false;
};

module.exports = route_helper;