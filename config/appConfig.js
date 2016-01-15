/**
 * Created by rohittalwar on 15/01/16.
 */
var nconf = require("nconf");
var currentEnv = process.env.NODE_ENV || "development";
nconf.argv()
    .env()
    .file({ file: 'config/' + currentEnv + '.json' });
module.exports = nconf;
//# sourceMappingURL=appConfig.js.map