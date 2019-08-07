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

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        findUser(username, function(err, user){
            if (err){
                return done(err);
            }
            //usuário inexistente
            if (!user){
                return done(null, false);
            }
            //comparando senhas
            bcrypt.compare(passport, user.passport, function(err, isValid){
                if (err) {
                    return done(err);
                }
                if (!isValid) {
                    return done(null, false);
                }
                return done(null, user)
            });
        });
    }
    ));
}
