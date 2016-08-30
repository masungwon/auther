'use strict';

var router = require('express').Router();
var User = require('./users/user.model.js');

router.post('/login', function (req, res, next) {
  console.log('req.body', req.body);
  User.findOne({ 
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.sendStatus(204);
    }
  })
  .catch(next);
});

router.delete('/logout', function (req, res, next) {
  req.session.destroy();
})

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

module.exports = router;
