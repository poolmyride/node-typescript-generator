"use strict";
function get(req, res) {
    //db.getUsers(function (users) {
    //    console.dir(users);
    //    res.render('index', {title: 'ImageBoard', users: users})
    //});
    res.write("hello");
    res.end();
}
exports.get = get;
;
//# sourceMappingURL=index.js.map