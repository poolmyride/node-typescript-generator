import * as express from "express"
var template = require('./template.marko');
    export function get(req:express.Request, res:express.Response) {
        //db.getUsers(function (users) {
        //    console.dir(users);
        //    res.render('index', {title: 'ImageBoard', users: users})
        //});
        console.log('yo')
        template.render({
            name:'Frank'
        },res)

    };



