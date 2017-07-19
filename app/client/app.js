global.jquery = require('jquery');
global.$ = global.jquery;

require('bootstrap');

var angular = require('angular');
require('angular-route'); //ng-route

//main angular module for the app
var app = angular.module('moodsic',['ngRoute']);

//routes
require('./routes')(app);

//controllers
require('./controllers/loginController')(app);
require('./controllers/signupController')(app);
require('./controllers/predictController')(app);
require('./controllers/resultsController')(app);

//services
require('./services/user')(app);

//directives
