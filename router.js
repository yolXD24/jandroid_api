const express = require("express");
const routes = express.Router();
// const login = require("./modules/login")
var db = require("./DBconnect")
// const token
//create
// var signOptions = {
//     issuer: 'javAndroid.com',
//     subject: 'javAndroidClient',
//     audience: 'javAndroidClient',
//     expiresIn: "12h",
//     algorithm: "RS256"
// };

db.connect(err => {
    if (err) throw err
    console.log('You are now connected...')
})
routes.route("/login").post((req, res) => {
    console.log("login...");
    console.log(req.body);

    db.query("SELECT * FROM accounts where username = '" + req.body.username + "' and password = '" + req.body.password + "'", function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ error: { status: true, message: err } })
        } else {
            if (!result.length) {
                return res.send({ error: { status: false, message: "account not found!" },auth: false, user: null  })
            }
            res.send({ error: { status: false, message: null }, auth: true, user: result[0] })
            console.log(result[0]);

        }
    });
});

routes.route("/register/:username/:password").post((req, res) => {

    var sql = "INSERT INTO accounts (username, password) VALUES ('" + req.body.username + "' , '" + req.body.password + "')";
    db.query(sql, function (err, result) {

        if (err) {
            console.log(err.sqlMessage);
            res.send({ error: { status: true, message: err.sqlMessage } })
        } else {
            res.send({ error: { status: false, message: null }, token: "javAndroid" })
        }
    });
});

module.exports = routes;