require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./router");


const environment = process.env.NODE_ENV; // development
// const stage = require('./config')[environment];
console.log("connecting....");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.get("/",(req, res)=>{
    res.send('connected')
})
app.use("/api", router);

app.listen(PORT, function () {
    console.log("Server is running on Port:", PORT);
});
