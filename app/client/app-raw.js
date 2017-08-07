global.jQuery = require('jquery');
global.$ = global.jQuery;

require('bootstrap');

var angular = require('angular');
require('angular-route'); //ng-route

require('angularjs-slider');

//main angular module for the app
var app = angular.module('moodsic',['ngRoute','rzModule']);

//services
require('./services/user')(app);
require('./services/session')(app);
require('./services/track')(app);
require('./services/artist')(app);

//controllers
require('./controllers/appController')(app);
require('./controllers/loginController')(app);
require('./controllers/signupController')(app);
require('./controllers/profileController')(app);
require('./controllers/editProfileController')(app);
require('./controllers/predictController')(app);
require('./controllers/resultsController')(app);
require('./controllers/addArtistsController')(app);
require('./controllers/changePasswordController')(app);


//directives


//routes
require('./routes')(app);
