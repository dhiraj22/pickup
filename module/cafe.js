
var cafeListing = require('../models/cafeListing');
var menuListing = require('../models/menuListing');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var geodist = require('geodist');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "ruchika.s@infiny.in",
        pass: "iluvmadad"
    }
});


  var distance=(cafeLat,cafeLong,userLat,userLong)=>
  {
     var dist =geodist({lat: cafeLat, lon:cafeLong}, {lat: userLat, lon:userLong}, {limit: 50});
     return dist;
  }


 exports.cafelisting = (req,res)=>{

     var token=req.body.userToken;
     var nearbyCafe=[];
    var decoded = jwt.decode(token, "pickup");
    console.log(decoded);
    console.log("decoded");
          //  var data = new cafeListing({
           //
          //     cafe_name : "urban cafe",
          //     status : "active",
          //     imageurl : "https://s3-media4.fl.yelpcdn.com/bphoto/LCWlRrfmJFZvHJ0VK8_wGw/ls.jpg",
          //     rating : "2",
          //     position : {
          //         lat : "134.05839",
          //         long : "73.00754"
          //     }
          //  })
           //
          //  data.save((err,user)=>{
           //
          //  	if (err) {
          //             return res.status(500).json({
          //                 title: 'An error occurred',
          //                 error: err
          //             });
          //         }
          //         res.status(201).json({
          //             message: 'Saved user',
          //             obj: user
          //         });
           //
          //  })
       cafeListing.find({},(err,cafes)=>{

         if (err)
         {
             return res.status(500).json({
                 title: 'An error occurred',
                 error: err
             });
         }
         if(cafes.length <= 0)
         {
             return res.status(500).json({
                 title: 'No cafe found',

             });
         }
         for(i=0;i<cafes.length;i++)
          {
              var Lat=cafes[i].position.lat;
              var Long=  cafes[i].position.long;
              var TotalDistance = distance(Lat,Long,req.body.lat,req.body.lng);
              if(TotalDistance)
              {
                nearbyCafe.push(cafes[i]);
              }
          }
         res.status(200).json({
             title: 'Listing of cafe ',
             cafes: nearbyCafe

         });
      });

 }

 exports.menulisting = (req,res)=>{

     var token=req.body.userToken;
   var decoded = jwt.decode(token, "pickup");
    console.log(decoded);
    console.log("decoded");
    var toFind =req.body.sid;

       menuListing.findOne({ "shopName": toFind}).populate('shopName').exec(function (err, cafes){
         if (err)
         {
             return res.status(500).json({
                 title: 'An error occurred',
                 error: err
             });
         }
         if(cafes.length <= 0)
         {
             return res.status(500).json({
                 title: 'No cafe found',

             });
         }

         res.status(200).json({
             title: 'Listing of cafe ',
             cafes: cafes

         });
      });

 }

  exports.coffeeShopLogin = (req,res)=>{
    console.log(req.body);
    cafeListing.findOne({storeId:req.body.storeId},(err,coffeeShop)=>{
      console.log(coffeeShop);
        if (err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(coffeeShop.length<=0)
        {
            return res.status(500).json({
                title: 'No such shop found',
                error: 'invalid login'
            });
        }

        if(!bcrypt.compareSync(req.body.storePass,coffeeShop.storePass))
        {
           return res.status(500).json({
                title: 'Invalid password',
                error: 'password not match'
            });
        }
        var data={
          storeId:coffeeShop.storeId,
          storePass:coffeeShop.storePass,
          id:coffeeShop._id,
        }
        var token = jwt.sign({data:data},'secret',{expiresIn:7200});
        res.status(200).json({
            title: 'Login Succesful',
            message:"Shop found",
            token:token

        });

    });

  }

   exports.coffeeShopLogout = (req,res)=>{

     var token=req.body.userToken;
     console.log(token);
     var decoded = jwt.decode(token, "pickup");
      console.log(decoded);
      console.log("decoded");
      cafeListing.findOne({_id:decoded.data.id},(err,coffeeShop)=>{

        if (err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(coffeeShop.length<=0)
        {
            return res.status(500).json({
                title: 'No such shop found',
                error: 'invalid login'
            });
        }

        coffeeShop.isLoggedIn=false;
        coffeeShop.save((err,data)=>{

         	if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Logout succesfull',

                });

         })


      });




   }

  exports.coffeeShopForgotPassword = (req,res)=>{

    var token;
    crypto.randomBytes(5, (err, buf) => {
    if (err) {
      return res.status(500).json({
           title: 'Invalid string generated',
           error: err
       });
    }
    console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
    token = buf.toString('hex');
    });
    cafeListing.findOne({storeId:req.body.storeId},(err,coffeeShop)=>{

        if (err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!coffeeShop)
        {
            return res.status(500).json({
                title: 'user not found',
                error: 'invalid login'
            });
        }
        coffeeShop.resetPasswordToken = token;
        coffeeShop.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        coffeeShop.save(function(err) {
            if (err)
            {
                return res.status(500).json({
                    title: 'An error occurred while updating',
                    error: err
                });
            }

            var mailOptions = {
                                  // to: coffeeShop.storeId,
                                  to:'ruchika.s@infiny.in',
                                  from: 'ruchika.s@infiny.in',
                                  subject: 'Pickcup Password Reset',
                                  text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                                    'Your token to reset your password is:\n\n' +
                                         token + '\n\n' +
                                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                                };

              smtpTransport.sendMail(mailOptions, function(err) {
                      if (err)
                      {
                          return res.status(500).json({
                              title: 'An error occurred while sending email',
                              error: err
                          });
                      }

                      res.status(200).json({
                          title: 'RESET PASSSWORD',
                          message:'Reset email sent'
                      });
              });
        });
    });


  }

  exports.coffeeShopResetPassword = (req, res)=>{
    console.log(req.body);
    cafeListing.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } },(err,user)=>{

        if (err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user)
        {
            return res.status(500).json({
                title: 'user not found',
                error: 'invalid login'
            });
        }
        user.storePass = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save(function(err) {
            if (err)
            {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                title: 'Password Reset Succesful',
                message:'Succesfully set your password.'
            });

         });


    });

  }

    exports.coffeeShopSetStatus = (req,res)=>{
        var token=req.body.userToken;
        console.log(token);
        var decoded = jwt.decode(token, "pickup");
        console.log(decoded);
        console.log("decoded");
        cafeListing.findOne({_id:decoded.data.id},(err,coffeeShop)=>{

          if (err)
          {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
          if(coffeeShop.length<=0)
          {
              return res.status(500).json({
                  title: ' Shop not found',
                  error: 'invalid login'
              });
          }

          coffeeShop.status = req.body.status;
          coffeeShop.save(function(err) {
              if (err)
              {
                  return res.status(500).json({
                      title: 'An error occurred',
                      error: err
                  });
              }
                res.status(500).json({
                 title: 'Status saved succesfully',
                 message: req.body.status
                 })
        });
      });


     }
