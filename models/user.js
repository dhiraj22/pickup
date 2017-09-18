var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstname: {
      type: String,
     required: true
       },
    lastname: {
      type: String,
      required: true
    },
    password: {
      type: String,
       required: true
     },
    email: {
      type: String,
      required: true,
       unique: true
     },
    contact: {
       type: String,
       required: true,
       },
    dob: {
       type: String,
       required: true,
       },
     password: {
          type: String,
          required: true,
          },
    address: {
          city:{
            type: String,
            required: true,
          },
          postalCode:{
            type: String,
            required: true,
          },
          address:{
            type:String,
            required: true,
          }
        },
    resetPasswordToken: String,
    resetPasswordExpires: Date



});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('user', schema);
