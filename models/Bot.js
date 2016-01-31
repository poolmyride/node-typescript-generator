var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AppModel_1 = require("./AppModel");
var Bot = (function (_super) {
    __extends(Bot, _super);
    function Bot(mongooseModel) {
        _super.call(this, mongooseModel);
        this.mongooseModel = mongooseModel;
    }
    return Bot;
})(AppModel_1.AppModel);
//# sourceMappingURL=Bot.js.map