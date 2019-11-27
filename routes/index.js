var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var router = express.Router();
var Items = require('../models/items');

router.get('/', function (req, res, next) {
    res.render('index');
});

//Insert the data
router.post('/insert', function (req, res,next) {

    var data = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }
    console.log(data);

    var item = new Items(data);
    item.save(function(err, item){
        if(err) return console.log(err);
        console.log('Data inserted!!!');
    });

    res.redirect('/');
});

router.get('/get-data', function (req, res) {
    Items.find({}, function(err, details){
       
        if(err){
            console.log('Cannot fetch data from database!!!');
        }else{
            details.forEach(Items);
            res.render('details',{items: details});
        }
    });
   
});

router.get('/get-data/:id', function (req, res) {
   Items.findById(req.params.id)
   .exec(function(err, item){
       if (!err)
       {
    res.render('Edit_Author', {authors: item});
}else{
    console.log('Cannot output data!!');
}
   });

});



router.get('/update', function (req, res,next) {
    
});

router.get('/delete', function (req, res,next) {
    
});

module.exports = router;