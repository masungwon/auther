'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
}));

// place right after the session setup middleware
app.use(function (req, res, next) {
  // console.log('session', req.session);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

// TODO what is hapenning here?
passport.use(
  new GoogleStrategy({
    clientID: '184694102779-r0oear1m0ron3nm5q54k2onfh2oamg10.apps.googleusercontent.com',
    clientSecret: 'DtqSmI00_6k9HkpNvwLX1Pr1',
    callbackURL: 'http://localhost:8080/'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---
    */
    console.log('---', 'in verification callback', profile, '---');
	done();
  })
);

// Google authentication and login; '/api/auth/google'
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user; '/api/auth/google/callback'
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/', // or wherever
    failureRedirect : '/' // or wherever
  })
);

app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./statics.middleware'));

app.use(require('./error.middleware'));

module.exports = app;
