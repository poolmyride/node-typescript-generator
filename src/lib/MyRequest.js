var nodeRequest = require("request");
var Promise = require("bluebird");
function request(urlStr, options) {
    options = options || {};
    options.qs = options.query;
    options.json = options.handleAs === 'json';
    var prom = new Promise(function (resolve, reject) {
        nodeRequest(urlStr, options, function (error, response, body) {
            response.data = body;
            error ? reject(error) : resolve(response);
        });
    });
    return prom;
}
exports.request = request;
//# sourceMappingURL=MyRequest.js.map