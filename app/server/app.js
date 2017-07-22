const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

const db = require('./config/db');

mongoose.connect(db.url, {useMongoClient: true});

app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(path.join(__dirname+'/../client')));

app.use('/bootstrap',express.static(path.join(__dirname, '/../node_modules/bootstrap/dist')));

require('./routes')(app);

var port = process.env.PORT || 8080;
app.listen(port);

exports = module.exports = app;
