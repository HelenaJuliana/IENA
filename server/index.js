const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const bodyParser = require('body-parser')
const querystring = require('querystring');
const db = require('./db')

/**
 * -------------------------------
 * middware
 * -------------------------------
 * **/
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3004');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.static('public'));

/**
 * -------------------------------
 * routes page
 * -------------------------------
 * **/
app.route('/')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        next();
    })
    .get(function (req, res, next) {
        res.sendFile(__dirname+"/public/index.html")
        //res.json(req.user);
    })

/**
 * -------------------------------
 * routes API
 * -------------------------------
 * **/
app.route('/api/jnr/:table')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        next();
    })
    .get(function (req, res, next) {

        //db.search()
        res.json({
            data: db.search(req.params.table, req.body)
        })
    })
    .post((req, res, next) => {

    })




//ouvindo os serviços
http.listen(process.env.PORT || 3004,
    () => console.log('---------------------\n\nIm listen in port 3001\n\n-------------------'));
