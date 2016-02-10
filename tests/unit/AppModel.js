var AppModel_1 = require('../../src/models/AppModel');
describe("AppModel", function () {
    var model;
    beforeEach(function () {
        model = new AppModel_1.AppModel();
    });
    describe("#test", function () {
        it('should support query method', function () {
            if (typeof model.query !== 'function') {
                throw new Error('Query method not present');
            }
        });
    });
});
//# sourceMappingURL=AppModel.js.map