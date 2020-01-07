var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('loginPage');
});

module.exports = router;