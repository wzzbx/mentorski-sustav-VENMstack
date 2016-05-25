//predmet.js

var mongoose = require('mongoose');

var predmetSchema = mongoose.Schema({
    //_id            : String,
    ime            : String,
    kod            : String,
    bodovi         : Number,
    sem_redovni    : String,
    sem_izvanredni : String,
    izborni        : Number,
    semestar       : String
 
});

module.exports = mongoose.model('Predmet', predmetSchema);