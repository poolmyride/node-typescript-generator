import * as express from "express"

    export function get(req:express.Request, res:express.Response) {
        //db.getUsers(function (users) {
        //    console.dir(users);
        //    res.render('index', {title: 'ImageBoard', users: users})
        //});
        res.write("hello")
        res.end()
    };



