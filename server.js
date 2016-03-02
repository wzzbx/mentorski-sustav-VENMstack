// server.js

var express  	   = require('express');
var app      	   = express();
var port     	   = process.env.PORT || 8080;
var mongoose 	   = require('mongoose');
var passport 	   = require('passport');
var flash    	   = require('connect-flash');
var cors    	   = require('cors');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var favicon        = require('serve-favicon');
var path           = require('path');
var history        = require('express-history-api-fallback');
var configDB       = require('./config/config.js');

// konfiguracija
mongoose.connect(configDB.url); // spoji se na bazu
app.use(cors());
require('./config/passport')(passport); // passport konfiguracija

/*var root = __dirname + '/public';
app.use(express.static(root));
app.use(history('index.html', { root: root }));*/ // serve index.html ne radi history ...

app.use(morgan('dev')); // log svaki zahtjev na console
app.use(cookieParser()); // read cookies (needed for auth) ne koristimo
app.use(bodyParser.json()); // get information from html forms ne koristimo
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

require('./routes/routes.js') (app,passport); // ucitaj route i posalji app i passport

// launch ======================================================================
app.listen(port);
console.log('mSustav server on port ' + port);