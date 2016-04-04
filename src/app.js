"use strict";
var markoRequire = require("marko/node-require");
markoRequire.install();
var express = require("express");
var bodyParser = require("body-parser");
var errorhandler = require("errorhandler");
var methodOverride = require("method-override");
var appConfig_1 = require("./config/appConfig");
var index = require("./pages/home/index");
var app = express();
// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
if (appConfig_1["default"].get("errorHandling")) {
    app.use(errorhandler());
}
// Routes
app.get('/', index.get);
var port = appConfig_1["default"].get("port");
app.listen(port, function () {
    console.log("Demo Express server listening on port %d in %s mode", port, app.settings.env);
});
exports.App = app;
//# sourceMappingURL=app.js.map