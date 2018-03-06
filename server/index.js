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
