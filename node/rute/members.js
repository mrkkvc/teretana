const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teretana'
});

const memberSchema = Joi.object().keys({
    ime: Joi.string().trim().min(4).max(50).required(),
    prezime: Joi.string().trim().min(4).max(50).required(),
    pass: Joi.string().trim().min(4).max(50).required(),
});

const route = express.Router();
route.use(express.json());

route.get('/members', (req, res) => {
    pool.query("select * from members", (err, rows) => {
        //svaki objekat jedan red imaju atribute koje smo mi zadali
        if(err){
            res.status(500).send(err.sqlMessage);
        }else{
            res.send(rows);
        }
    });
});

route.get('/members/:id', (req, res) => {
    let query = "select * from members where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if(err){
            res.status(500).send(err.sqlMessage);
        }else {
            if(rows.length > 0){
                res.send(rows[0]);
            }else{
                res.status(404).send("No such member");
            }
        }
    });
});

route.post('/members', (req, res) => {
    let {error} = memberSchema.validate(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
    }else {
        let query = "insert into members (ime, prezime, pass) values ( ?, ?, ?)"
        let formated = mysql.format(query, [req.body.ime, req.body.prezime, req.body.pass]);

        pool.query(formated, (err, response) => {
            if (err) {
                res.status(500).send(err.sqlMessage);
            } else {
                //unet red vracamo ga kao potvrdu da je unesen
                query = "select * from members where id=?";
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err) {
                        res.status(500).send(err.sqlMessage);
                    } else {
                        res.send(rows[0]);
                    }
                });
            }
        });
    }
});
//update, ako upit uspe , select na osnovu id koji sam update i vracam poruku sa tim id
route.put('/members/:id', (req, res) => {
    let {error} = memberSchema.validate(req.body);

    if(error){
        res.status(400).send(err.details[0].message);
    }else {
        let query = "update members set ime=?, prezime=?, pass=?, where id=?";
        let formated = mysql.format(query, [req.body.ime, req.body.prezime, req.body.pass, req.params.id]);

        pool.query(formated, (err, response) => {
            if (err) {
                res.status(500).send(err.sqlMessage);
            } else {
                query = "select * from members where id=?";
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err) {
                        res.status(500).send(err.sqlMessage);
                    } else {
                        console.log(rows[0]);
                        res.send(rows[0]);
                    }
                });
            }
        });
    }
});

route.delete('/members/:id', (req, res) => {
    let query = "select * from members where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if(err){
            res.status(500).send(err.sqlMessage);
        }else{
            let member = rows[0];

            let query = "delete from members where id=?";
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, response) => {
                if(err){
                    res.status(500).send(err.sqlMessage);
                }else{
                    res.send(member);
                }
            });
        }
    });
});

module.exports = route;