var cafe = require('../models/cafeListing');
var user = require('../models/user');
var notification = require('../models/notification');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var nodemailer = require('nodemailer');


// exports.createNoti = (req,res)=>{
//   console.log(req.body);
//   var userdata = new notification({
//      shopDetail:'59afb7f2f2c2c60f5f30ba9b',
//      userDetail:'59ad41cb43a745205bfa13dc',
//
//      message: "You got a offer",
//
//    });
//
//
//
//   userdata.save((err,user)=>{
//
//    if (err) {
//              return res.status(500).json({
//                  title: 'An error occurred',
//                  error: err
//              });
//          }
//          res.status(201).json({
//              message: 'Saved user',
//              obj: user
//          });
//
//   })
//
// }

exports.ListNotification = (req,res)=>{
  var token=req.body.userToken;
  console.log(token);
  var decoded = jwt.decode(token, "pickup");
  console.log(decoded);
  console.log("decoded");

  notification.find({userDetail:decoded.user._id}).populate('shopDetail','status imageurl cafe_name status').exec(function (err, userNoti){

      if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
      if(!userNoti)
      {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
      }
      if(userNoti.length<=0)
      {
        return res.status(201).json({
            title: 'No notification found',
            message: 'No notification for requested user'
        });
      }
      res.status(201).json({
          title: 'Notification found',
          data: userNoti
      });



    });

}
