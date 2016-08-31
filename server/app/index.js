'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
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
