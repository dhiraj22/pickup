var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuListing = require('./menuListing');

var schema = new Schema({

     startdate: {
       type: Date,
        required: true
       },
      enddate: {
         type: Date,
          required: true
         },
      quantity: {
        type: String,
         required: true
        },
      RewardItemDetail:{
        shopDetail: {
          type: Schema.ObjectId,
          ref: 'menuListing'
           },
        itemName:{
          type:String,
          required: true
        },
        itemId:{
          type: Schema.ObjectId,
          required: true
        },
        itemCat:{
            type:String,
          required: true
        }
      }


});


module.exports = mongoose.model('reward', schema);
