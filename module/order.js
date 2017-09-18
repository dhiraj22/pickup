
// var user = require('../models/user');
// var order = require('../models/order');
// var menuListing = require('./menuListing');
// var bcrypt = require('bcrypt-nodejs');
// var jwt = require('jsonwebtoken');


// exports.createOrder = (req,res)=>{
//   var token=req.body.userToken;
//   console.log(token);
//   var decoded = jwt.decode(token, "pickup");
//   console.log(decoded);
//   console.log("decoded");
//   var itemCat=req.body.itemCat;
//   var itemCatId='category.' + itemCat + '._id';
//   var itemCatory='category.' + itemCat ;
//   var order=req.body.order;
//   var CorrectOrder=[];
//   menuListing.findOne({ "shopName": req.body.shopId}).exec(function (err,store){

//     if(err){
//               return res.status(500).json({
//                   title: 'An error occurred',
//                   error: err
//               });
//           }
//     if(!store){
//               return res.status(500).json({
//                   title: 'No store found',

//               });
//           }

//         for (var i = 0; i < order.length; i++) {
//              var data=order[i]
//               for (var j = 0; j < itemCatory.length; j++) {
//                   var shopItem=itemCatory[j];
//                    if(data.itemId == shopItem._id)
//                    {
//                      var pushed_ItemId=
//                      var pushed_ItemSize=
//                      var pushed_ItemCat=
//                      var pushed_ItemParcel=
//                      var pushed_Itemtime=
//                      CorrectOrder.push(data);
//                    }
//               }
//         }

//       if(CorrectOrder.length <= 0)
//       {
//         return res.status(500).json({
//             title: 'Ordered details are incoorrrect',

//         });
//       }

//       var ordered = new order({

//         userDetail: decoded.user._id,
//         Ordered:[{
//           itemId:req.body.itemId,
//           itemSize:req.body.itemSize,
//           itemCat:req.body.itemCat,
//           parcel:req.body.parcel,
//           timeForPickcup:req.body.timeForPickcup,
//         }]

//        })




//       ordered.save((err,user)=>{

//       	if (err) {
//                  return res.status(500).json({
//                      title: 'An error occurred',
//                      error: err
//                  });
//              }
//              res.status(201).json({
//                  message: 'Saved user',
//                  obj: user
//              });

//       })



//   });


//  }
