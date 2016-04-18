// user.js 

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'), 
    SALT_WORK_FACTOR = 10;
var Predmet = require('./predmet');   
//var bcrypt = require('bcrypt'); 1.6gb SDK pa ko voli :D

// user model
//var ObjectId = userSchema.ObjectId;
var userSchema = mongoose.Schema ({
    //id      : Object,
    ime : String,
    prezime : String,
    brIndex : String,
	email    : { type: String, required: true, index: { unique: true }},
    password : { type: String, required: true },
    isAdmin  : Boolean,
    status   : String,
    predmeti : [],
    studenti : [],
    polozeni : [],
			
});

userSchema.pre('save', function(next) {
    var user = this;

    // hash samo ako je pass novi ili minjan
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash password sa new salt
        bcrypt.hashSync(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // minjaj password sa hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
	return bcrypt.compareSync(candidatePassword, this.password);
};
// export User
module.exports = mongoose.model('User', userSchema);

