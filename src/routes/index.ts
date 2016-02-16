import * as express from "express"
import * as db from "../db"

    export function get(req:express.Request, res:express.Response) {
        //db.getUsers(function (users) {
        //    console.dir(users);
        //    res.render('index', {title: 'ImageBoard', users: users})
        //});
        res.send("hello")
    };



