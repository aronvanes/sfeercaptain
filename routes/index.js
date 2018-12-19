var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passport = require('passport');
var expressvalidator = require('express-validator');

var user = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'de 12de man' });
});


/*LOGIN*/
router.get('/login',function(req, res, next) {
    res.render('login.pug', {message : req.flash('loginMessage') });
});

router.post('/login', passport.authenticate(['local-login'], {
    successRedirect:'/loggedInUser',
    failureRedirect: '/login',
    failureFlash : true
}));

router.get('/loggedInUser', isLoggedIn, function(req, res) {
    res.render('loggedInUser.pug', { user: req.user ,name: req.user.normal.naam});
});

/*SIGNUP*/
router.get('/register', function(req, res, next){
  res.render('register',{ title: 'Sfeercaptain' ,message: req.flash('signupMessage')});

});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/loggedInUser', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true
}));

/*ADMIN*/

router.get('/admin' ,function (req,res,next){
    res.render('admin.pug');
});

router.post('/admin', passport.authenticate(['admin-login'], {
    successRedirect:'/loggedAdmin',
    failureRedirect: '/admin',
    failureFlash : true
}));

router.get('/loggedAdmin', isLoggedIn, function(req, res) {
    res.render('loggedAdmin.pug', { user: req.user , AdminName: req.user.admin.name});
});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}