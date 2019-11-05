const express = require("express");
const routes = express.Router();
const jwt = require('jsonwebtoken')
// const login = require("./modules/login")
var db = require("./DBconnect")
// const token
//create
var signOptions = {
    issuer: 'javAndroid.com',
    subject: 'javAndroidClient',
    audience: 'javAndroidClient',
    expiresIn: "12h",
    algorithm: "RS256"
};

db.connect(err => {
    if (err) throw err
    console.log('You are now connected...')
})
routes.route("/login/:username/:password").get((req, res) => {
    console.log("login...");
    console.log(req.params);

    db.query("SELECT * FROM accounts where username = '" + req.params.username + "' and password = '" + req.params.password + "'", function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ error: { status: true, message: err } })
        } else {
            if (!result.length) {
                return res.send({ error: { status: false, message: "account not found!" }, acessToken: null })
            }
            var token = jwt.sign({ data: result[0] }, 'javAndroid');
            res.send({ error: { status: false, message: null }, acessToken: token })
            console.log(result[0]);

        }
    });
});

routes.route("/register/:username/:password").get((req, res) => {
    console.log("register...");

    var sql = "INSERT INTO accounts (username, password) VALUES ('" + req.params.username + "' , '" + req.params.password + "')";
    db.query(sql, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err.sqlMessage);
            res.send({ error: { status: true, message: err.sqlMessage } })
        } else {
            var token = jwt.sign(req.params, 'javAndroid');
            res.send({ error: { status: false, message: null }, token: token })
        }
    });
});

module.exports = routes;