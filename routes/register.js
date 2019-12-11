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
        bcrypt.hash(newUser.password, salt, function(err, hash){
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
                req.session.msg.push("This email is already in use");
                res.redirect('/login');
            
              }
            });
        });
    });
    }
});

module.exports = router;

/*
let newUser = new User({
    name:name,
    email:email,
    username:username,
    password:password
});

newUser.save(function(err){
    if(err){
    console.log(err);
    return;
}
else{
    res.redirect('/login');

  }
});
//const password2 =req.body.password2;
check('name').not().isEmpty().withMessage('name is required.');
check('email').not().isEmpty().withMessage('email is required.');
check('username').not().isEmpty().withMessage('Body is required.');
check('password').not().isEmpty().withMessage('Body is required.');
check('password2').not().isEmpty().withMessage('Body is required.').equals(req.body.password);

/*check('name', 'A valid firstname is required').notEmpty();
check('email', 'A valid firstname is required').notEmpty();
check('email', 'A valid firstname is required').isEmail();
check('username', 'A valid firstname is required').notEmpty();
check('password', 'A valid firstname is required').notEmpty();
check('password2', 'A valid firstname is required').equals(req.body.password);*/