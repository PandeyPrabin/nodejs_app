var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');



var User = ('../models/user');


//register form
router.get('/register', function(req, res){

    res.render('register');

});

router.post('/newuser', function(req, res){


const name =req.body.name;
const email =req.body.email;
const username =req.body.username;
const password =req.body.password;
const password2 =req.body.password2;

check('name', 'A valid firstname is required').notEmpty();
check('email', 'A valid firstname is required').notEmpty();
check('email', 'A valid firstname is required').isEmail();
check('username', 'A valid firstname is required').notEmpty();
check('password', 'A valid firstname is required').notEmpty();
check('password2', 'A valid firstname is required').equals(req.body.password);

/*req.checkbody('name', 'Name is required').notEmpty();
req.checkbody('email', 'Email is required').notEmpty();
req.checkbody('email', 'Email is not valid').isEmail();
req.checkbody('username', 'Username is required').notEmpty();
req.checkbody('password', 'Password is required').notEmpty();
req.checkbody('password2', 'Passwords donot match').equals(req.body.password); */

let errors = validationResult(req);

if (errors){
    res.render('register',{
        errors:errors
    });
}else{
    let newUser = new User({
        name:name,
        email:email,
        username:username,
        password:password
    });
    console.log(newUser);

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(error){
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(function(err){
                if(err){
                console.log(err);
                return;
            }
            else{
                req.flash('success', 'You are now registered and can log in');
                res.redirect('/login');
            
              }
            });
        });
    });
    }
});

module.exports = router;