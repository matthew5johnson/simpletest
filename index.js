const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 8080);

const connection = mysql.createConnection({ 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PW, 
    database: process.env.DB_DB, 
    port: process.env.DB_PORT
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /api for the good stuff')
});

app.get('/api', (req, res) => {
    connection.query('SELECT * FROM aws_matchuptable WHERE season=2018 AND week=10 AND franchise="Nick & Mickey";', (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.listen(app.get('port'));
