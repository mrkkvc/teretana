const express = require('express');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teretana'
});

const route = express.Router();
route.use(express.json());

route.get('/kartice', (req, res) => {
    pool.query("select * from kartice", (err, rows) => {
        //svaki objekat jedan red imaju atribute koje smo mi zadali
        if(err){
            res.status(500).send(err.sqlMessage);
        }else{
            res.send(rows);
        }
    });
});

module.exports = route;