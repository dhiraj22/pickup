var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// [ready,closed,busy]
var schema = new Schema({
    cafe_name: {
      type: String,
     required: true
       },
     storeId: {
       type: String,
      required: true
        },
      storePass: {
        type: String,
       required: true
         },
      status:{
        type: String,
         enum: ['ready', 'closed', 'busy']
       },
      imageurl: {
      type: String,
      required: true
     },
    rating: {
      type: String,
      required: true,
      },
    isLoggedIn: {
      type: Boolean,
      required: true,
      default:true
      },
    position: {
                lat:{
                  type: String,
                  required: true,
                },
                long:{
                  type: String,
                  required: true,
                }
              },
      resetPasswordToken: String,
      resetPasswordExpires: Date
});


module.exports = mongoose.model('cafeListing', schema);
