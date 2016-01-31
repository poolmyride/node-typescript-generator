var db = require("../db");
function get(req, res) {
    db.getUsers(function (users) {
        console.dir(users);
        res.render('index', { title: 'ImageBoard', users: users });
    });
}
exports.get = get;
;
//# sourceMappingURL=index.js.map