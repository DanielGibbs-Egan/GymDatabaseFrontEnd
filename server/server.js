const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
let mysql = require('mysql2');

let con = mysql.createConnection({
    host: "localhost",
    user: "Daniel",
    password: "MySQLServerPassword67!"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connected!");
    con.query(`use application;`, function (err, result) {
        if (err) throw err;
        console.log("result: " + JSON.stringify(result));
    });
    con.query(`select * from data;`, function (err, result) {
        if (err) throw err;
        console.log("result: " + JSON.stringify(result));
    });
});

app.use(cors());
app.use(express.json());

app.put('/', (req, res) => {
    console.log(`${req.body.data_type}[ username: ${req.body.username}, pass: ${req.body.password} ]`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});