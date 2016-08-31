'use strict';

var router = require('express').Router();
var User = require('./users/user.model.js');

router.post('/login', function (req, res, next) {
  User.findOne({ 
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      //res.status(204);
      res.json(user.dataValues);
    }
  })
  .catch(next);
});

router.delete('/logout', function (req, res, next) {
  req.session.destroy();
  res.sendStatus(204);
})


router.get('/auth/me', function (req, res, next) {
  console.log("in router");
  User.findById(req.session.userId) //findById just takes in Id, NOT where
  .then(function (user) {
    console.log("found by id! user is ", user);
    if (!user) { res.json(null); }
    else { 
      res.json(user.data);
    }
  })
  .catch(next);
})

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

module.exports = router;
