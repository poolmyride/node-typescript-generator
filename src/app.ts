import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as errorhandler from "errorhandler";
import * as methodOverride from "method-override";
import  appConfig from "./config/appConfig"
import * as index from "./routes/index";
import * as db from "./db";

var app = express();

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

if (appConfig.get("errorHandling")) {
    app.use(errorhandler());
}


// Routes

app.get('/', index.get);


var port = appConfig.get("port")
app.listen(port, function(){
    console.log("Demo Express server listening on port %d in %s mode", port, app.settings.env);
});

export var App = app;