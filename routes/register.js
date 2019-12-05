var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var router = express.Router();

router.get('/viewpage', function (req, res, next) {
    res.render('register');
});

module.exports = router;