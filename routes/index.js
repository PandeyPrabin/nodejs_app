var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var router = express.Router();
var Items = require('../models/items');
var nodemailer = require('nodemailer');


router.get('/', function (req, res, next) {
    res.render('index');
});

//Insert the data
router.post('/insert', function (req, res,next) {

 /*   var data = {
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

    res.redirect('/'); */

    var output = `
    <p>You have a new contact request</p>
    <h2>Contact Details</h2>
    <ul>
        <li>Title: ${req.body.title}</li>
        <li>Title: ${req.body.content}</li>
        <li>Title: ${req.body.author}</li>
    </ul>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "0aa05f7a8ab974", // generated ethereal user
          pass: "cbf894d4cfed68"// generated ethereal password
        }
      });
    
      // send mail with defined transport object
      var mailOptions={
        from: '"Fred Foo 👻" <stormrider6225@gmail.com>', // sender address
        to: "magarajit330@gmail.com", // list of receivers
        subject: "Email test", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
         console.log("Message sent: %s", info.messageId);
      
         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            res.render('index', {msg:'Email has been sent!!!'});

    });
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