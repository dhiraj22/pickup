var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cafeListing = require('./cafeListing');

var schema = new Schema({

      userDetail: {
       type: Schema.ObjectId,
       ref: 'cafeListing'
        },
      Ordered:[{
        itemId:{
          type: Schema.ObjectId,
          required: true
        },
        itemSize:{
          type: String,
          required: true
        },
        itemCat:{
          type: String,
          required: true
        },
        parcel:{
          type: Boolean,
          default: true
        },
        shopDetail: {
        type: Schema.ObjectId,
        ref: 'cafeListing'
         },
        timeForPickcup:{
          type: Date,
          required: true
        }
      }]


});


module.exports = mongoose.model('order', schema);
