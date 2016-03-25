var template = require('./template.marko');
function get(req, res) {
    //db.getUsers(function (users) {
    //    console.dir(users);
    //    res.render('index', {title: 'ImageBoard', users: users})
    //});
    console.log('yo');
    template.render({
        name: 'Frank'
    }, res);
}
exports.get = get;
;
//# sourceMappingURL=index.js.map