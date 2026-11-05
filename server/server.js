const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
let mysql = require('mysql2/promise');

let connection = mysql.createPool({
    host: "localhost",
    user: "Daniel",
    password: "MySQLServerPassword67!",
    database: "application",
    multipleStatements: true
});

async function get_userdata(username, password) {
    const [users, fields] = await connection.query(`
        SELECT * FROM USER
        WHERE Username = '${username}';
    `);
    return users;
}

async function register_user(username, password) {
    const [users, fields] = await connection.query(`
        INSERT 
        INTO 
        USER    (Username,      Password     )
        VALUES  ('${username}', '${password}');
    `);
    return true;
}

function run_query(sql_statement) {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected!");

        connection.query(sql_statement, function (err, results) {
            if (err) throw err;
            console.log("result: " + JSON.stringify(results[results.length - 1]));
        });
    });
}



app.use(cors());
app.use(express.json());

const request_functions = {
    signup: async (req) => {
        const [user] = await get_userdata(req.body.username);

        if (user != undefined)
            return 2; // 2: user exists

        console.log(`username is unique: ${req.body.username}`);

        await register_user(req.body.username, req.body.password);
            
        console.log(`added user: ${req.body.username}`);
        return 0;
    },
    login: async (req) => {
        const [user] = await get_userdata(req.body.username);

        if (user == undefined)
            return 2; // 2: user doesn't exist

        console.log(`${JSON.stringify(user)}`);

        console.log(`user exists: ${JSON.stringify(user.Username)}`);

        if (req.body.password != user.Password)
            return 3; // 3: password is incorrect

        return 0;
    },
}; 

app.put('/', async (req, res) => {
    console.log(`${req.body.req_type}[ username: ${req.body.username}, pass: ${req.body.password} ]`);
    const request_finish_code = await request_functions[req.body.req_type](req);
    res.send(JSON.stringify({ code: request_finish_code }));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});