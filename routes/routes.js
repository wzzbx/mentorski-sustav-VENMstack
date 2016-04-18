//user routes

// User & Predmet model
var User    = require('../models/user');
var Predmet = require('../models/predmet');
// Lodash.js
var _ 		= require('lodash');
var jwt     = require('jsonwebtoken'); 
var config  = require('../config/config.js');
var jwt_check = require('express-jwt');

module.exports = function(app,passport) {

    //var jwtCheck = jwt_check({ secret : config.secret });

    app.get('/mentor/:email', function(req, res){
    	User.find({ email : req.params.email })
            .exec(function(err, data) {
                
               var ids = _.map(data[0].studenti, function(id) { 
                            return (id);
                             });
              
                        User.find({_id: { $in : ids }}, function(err, data) {    
                            res.send(data);
            });
        });
         
    });
    
    app.get('/predmet', function(req, res){
        Predmet.find({}, function(err, data) { 
            if (err) throw err;   
                res.send(data);
        });
    });

    app.get('/user/:email',function(req,res){
        
    	User.find({ email : req.params.email })
            .exec(function(err, data) {

    		   var ids = _.map(data[0].predmeti, function(o) { 
                            return (o.id);
                             });
               console.log(ids);
               var upisani = _.map(data[0].predmeti, function(id){ return (id); });
               console.log(upisani);
               
                   		Predmet.find({_id: { $in : ids }}, function(err, predmeti) {	

                            res.send({predmeti,upisani});
    		});
		});
   });

    /*app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // 
        failureRedirect : '/predmet', // 
        failureFlash : true // allow flash messages

    }));*/
    
    app.post('/login', passport.authenticate('local-login'), function(req, res) { 
        
        var user = req.user.toJSON();
            var isAdmin = user.isAdmin;
                var id_token = jwt.sign(_.omit(user,'password'), config.secret, { expiresIn: 60*5 });         
                    res.send({ id_token, isAdmin });
        
    });
   
 /*   app.get('/loggedin', function(req, res) {           logika prebacena na front-end
        res.send(req.isAuthenticated() ? req.user : '0');
    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.send(200);
    });*/

    app.get('/user/:email/predmet/:id/:ponavlja',function(req,res){
        
        User.update({ email : req.params.email },
            { $addToSet : { predmeti : { "id" : req.params.id, "ponavlja" : req.params.ponavlja} }}).exec(function(err){
                if (err) throw err; 
            })
            res.sendStatus(200);
    });
    app.get('/user/:email/removePredmet/:id',function(req,res){
        
        User.update({ email : req.params.email },
            { $pull : { predmeti : { "id" : req.params.id }}}).exec(function(err){
                if (err) throw err; 
            })
            res.sendStatus(200);
        });
    app.get('/user/:email/removePolozeniPredmet/:id',function(req,res){
        
        User.update({ email : req.params.email },
            { $pull : { polozeni : { "id" : req.params.id }}}).exec(function(err){
                if (err) throw err; 
            })
            res.sendStatus(200);
        });



    app.get('/user/:email/polozeno/:id/:ocjena', function(req, res){
        User.update({ email : req.params.email },
            { $pull : { polozeni : { "id" : req.params.id }}}).exec(function(err){
                if (err) throw err; 
            })
            res.sendStatus(200);

        User.update({ email : req.params.email },
            { $addToSet : { polozeni : { "id" : req.params.id, "ocjena" : req.params.ocjena} }}).exec(function(err){
                if (err) throw err; 
            })
            res.sendStatus(200);

    });
     app.get('/user_polozeni/:email',function(req,res){
        
        User.find({ email : req.params.email })
            .exec(function(err, data) {

               var ids = _.map(data[0].polozeni, function(o) { 
                            return (o.id);
                             });
               console.log(ids);
               var polozeni = _.map(data[0].polozeni, function(id){ return (id); });
               console.log(polozeni);
               
                        Predmet.find({_id: { $in : ids }}, function(err, predmeti) {    

                            res.send({predmeti,polozeni});
            });
        });
   });
    

};
    // route middleware to make sure a user is logged in ne koristimo user session
/*    function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, Freddie Mercury
    if (!req.isAuthenticated())
         res.send(401);
     else
        return next();
    // if they aren't redirect them to the home page
    // res.redirect('/'); mi ne zelimo da server redirecta time se bavi frontend router 
};*/

    
    	


