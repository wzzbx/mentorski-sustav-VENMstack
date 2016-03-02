var LocalStrategy   = require('passport-local').Strategy;
// load up the user model
var User    = require('../models/user');

module.exports = function(passport) {

    // passport session setup ==================================================
    
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(email, done) {
        User.findById(email, function(err, user) {
            done(err, user);
        });
    });
    
    // LOCAL LOGIN =============================================================
  
    passport.use('local-login', new LocalStrategy({
        //default za local strategy (username & password), override sa email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true //pass to the callback
    },
    function(req, email, password, done) { // callback sa email & password iz forme
    	// find usera
        User.findOne({ email : email }, function(err, user) { 
            if (err) {
                 return done(err);
            }
            // if no user is found, return the message
            if (!user) {
                return done(null, false); // req.flash trenutno maknut :D
            }

            // if the user is found but the password is wrong
            if (!user.comparePassword(password)) 
            	return done(null, false); // req.flash

            // sve valja vrati usera
            return done(null, user);
                    
        });

    }));

};