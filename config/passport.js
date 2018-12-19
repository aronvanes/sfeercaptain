var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');
var mongoose = require('mongoose');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
//SIGNUP
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'naam',
            passReqToCallback: true
        },
        function(req, email, naam, done) {
            process.nextTick(function() {
                User.findOne({ 'normal.email':  email }, function(err, user) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (user) {
                        return done(null, false,req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        var newUser = new User();
                        newUser.normal.email = email;
                        newUser.normal.naam = naam;
                        newUser.normal.age = req.param('age');
                        newUser.save(function(err) {
                            if (err){
                                console.log(err);
                                throw err;}
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
//LOGIN users
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'naam',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({ 'normal.email':  email }, function(err, user) {
                if (err){
                    console.log(err);
                    return done(err);}
                if (!user){
                    console.log(err);
                    return done(null, false,req.flash( 'loginMessage', 'No user found.'));}
                return done(null, user);
            });
        }));
//LOGIN ADMIN
    passport.use('admin-login', new LocalStrategy({
            usernameField: 'adnaam',
            passwordField: 'pass',
            passReqToCallback: true
        },
        function(req, adnaam, pass, done) {
            User.findOne({ 'admin.pass':  pass }, function(err, user) {
                if (err){
                    return done(err);}
                if (!user){
                    return done(null, false,req.flash( 'loginMessage', 'No user found.'));}
                return done(null, user);
            });
        }));

};