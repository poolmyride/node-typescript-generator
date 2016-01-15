var db = require("../db");
var index;
(function (index) {
    function get(req, res) {
        db.getUsers(function (users) {
            console.dir(users);
            res.render('index', { title: 'ImageBoard', users: users });
        });
    }
    index.get = get;
    ;
})(index || (index = {}));
module.exports = index;
//# sourceMappingURL=index.js.map