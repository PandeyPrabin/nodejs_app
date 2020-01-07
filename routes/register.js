var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var User = require('../models/user');


//register form
router.get('/register', function(req, res){

    res.render('register');

});


router.post('/newuser', function(req, res){
    console.log(req);

const name =req.body.name;
const email =req.body.email;
const username =req.body.username;
const password =req.body.password;
const password2 =req.body.password2;

req.checkBody('name', 'Name is required').notEmpty();
req.checkBody('email', 'Email is required').notEmpty();
req.checkBody('email', 'Email is not valid').isEmail();
req.checkBody('username', 'Username is required').notEmpty();
req.checkBody('password', 'Password is required').notEmpty();
req.checkBody('password2', 'Passwords donot match').equals(req.body.password); 

var errors = req.validationErrors();

if (errors){
    res.render(errors)
}else{
    let newUser = new User({
        name:name,
        email:email,
        username:username,
        password:password
    });
   

    bcrypt.genSalt(10, function(error, salt){
        bcrypt.hash(newUser.password, salt, function(error, hash){
            if(error){
                console.log(error);
            }
            newUser.password = hash;
            newUser.save(function(error){
                if(error){
                console.log(error);
                return;
            }
            else{
                //req.session.msg.push("This email is already in use");
                res.redirect('/login');
            
              }
            });
        });
    });
    }
});

module.exports = router;