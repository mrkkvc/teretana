const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const members = require('./rute/members');
const kartice = require('./rute/kartice');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
});

app.use('/api', members);
app.use('/api', kartice);

const staticDir = express.static(path.join(__dirname, 'dist'));

app.use(staticDir);
app.use(history);
app.use(staticDir);

app.listen(800);

console.log("[ sve kul ]");