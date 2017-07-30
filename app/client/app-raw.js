global.jQuery = require('jquery');
global.$ = global.jQuery;

require('bootstrap');

var angular = require('angular');
require('angular-route'); //ng-route

//main angular module for the app
var app = angular.module('moodsic',['ngRoute']);

//services
require('./services/user')(app);
require('./services/session')(app);
require('./services/track')(app);

//controllers
require('./controllers/appController')(app);
require('./controllers/loginController')(app);
require('./controllers/signupController')(app);
require('./controllers/profileController')(app);
require('./controllers/editProfileController')(app);
require('./controllers/predictController')(app);
require('./controllers/resultsController')(app);
require('./controllers/addArtistsController')(app);


//directives


//routes
require('./routes')(app);
