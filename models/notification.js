var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cafeListing = require('./cafeListing');
var user= require('./user');

var schema = new Schema({
    shopDetail: {
      type: Schema.ObjectId,
      ref: 'cafeListing'
       },
    userDetail:{
      type: Schema.ObjectId,
      ref: 'user'
    },
    message: {
      type: String,
       required: true
     }
  },
  {
    timestamps: true
  });


module.exports = mongoose.model('notificationListing', schema);
