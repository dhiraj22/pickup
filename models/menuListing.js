var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cafeListing = require('./cafeListing');

var schema = new Schema({
    shopName: {
      type: Schema.ObjectId,
      ref: 'cafeListing'
       },
     category:
      { type: Schema.Types.Mixed,
        default: {}
       }
    // category:{
    //   // drinks:[
    //   //            {
    //   //               itemName :{
    //   //                 type: String,
    //   //                 required: true
    //   //               },
    //   //               itemPrice :{
    //   //                 type: String,
    //   //                 required: true
    //   //               },
    //   //               moreData : [
    //   //                             {
    //   //                                 itemSize : {
    //   //                                   type: String,
    //   //                                   required: true
    //   //                                 },
    //   //                                 itemPrice : {
    //   //                                   type: String,
    //   //                                   required: true
    //   //                                 },
    //   //                             }
    //   //                         ]
    //   //            }
    //   //          ]
    // }

});


module.exports = mongoose.model('menuListing', schema);
