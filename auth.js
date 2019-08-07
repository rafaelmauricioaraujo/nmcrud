const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport){
    function findUser(username, callback){
        global.db.collection('users').findOne({'username':username}, function(err){
            callback(err, doc);
        });
    }

    function findUserById(id, callback){
        const ObjectId = require('mongodb').ObjectID;
        global.db.collection('users').findOne({_id:ObjectId(id)}, (err, doc)=>{
            callback(err, doc);
        });
    }

    passport.serializeUser(function(user, done){
        done(null, user_id);
    });

    passport.deserializeUser(function(user, done){
        findUserById(id, function(err, user){
            done(err, done);
        });
    });
}