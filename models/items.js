var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
    },
    phonenumber: {
        type: String,
        
      },
    
    });

    //Export model
module.exports = mongoose.model('items', ItemSchema );