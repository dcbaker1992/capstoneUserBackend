var express = require('express');
var router = express.Router();
var User = require("../models/userModel")
var passport = require('passport');
const { append } = require('express/lib/response');


router.post('/register', function (req, res, next) {
    addToDB(req, res);
  });


  async function addToDB(req, res){
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: User.hashPassword(req.body.password),
        creation_dt: Date.now()
      });

      try {
        doc = await user.save();
        return res.status(201).json(doc);
      }
      catch (err) {
        return res.status(501).json(err);
      }
    }



router.post('/login', function(req, res, next){
    console.log(req.body)
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
          if (err) { return res.status(501).json(err); }
          return res.status(200).json({message:'Login Success'});
        });
      })(req, res, next);
});

module.exports = router 