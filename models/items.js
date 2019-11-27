var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
    },
    author: {
        type: String,
        
      },
    
    });

    //Export model
module.exports = mongoose.model('items', ItemSchema );