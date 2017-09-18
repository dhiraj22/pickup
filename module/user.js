
var user = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
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

 exports.signup = (req,res)=>{
   console.log(req.body);
   var userdata = new user({
   	  firstname:req.body.firstname,
      lastname: req.body.lastname,
      password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
      email: req.body.email,
      contact: req.body.contact,
      dob: req.body.dob,
      address: {
        postalCode: req.body.postalcode,
        address:req.body.address,
        city:req.body.city
      }
    });



   userdata.save((err,user)=>{

   	if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }
          res.status(201).json({
              message: 'Saved user',
              obj: user
          });

   })

 }


 exports.signin = (req, res)=>{
   console.log(req.body);
   user.findOne({email:req.body.email},(err,user)=>{

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
       if(!bcrypt.compareSync(req.body.password,user.password))
       {
         console.log("err");
            console.log("user");
          return res.status(500).json({
               title: 'Invalid password',
               error: 'password does not match'
           });
       }
       var token = jwt.sign({user:user},'pickup',{expiresIn:7200});
       res.status(200).json({
           title: 'user found',
           token: token,
           userId:user._id
       });

   });

 }

 exports.forgotPassword = (req, res)=>{
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
          user.findOne({email:req.body.email},(err,user)=>{

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
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
              user.save(function(err) {
                  if (err)
                  {
                      return res.status(500).json({
                          title: 'An error occurred',
                          error: err
                      });
                  }

                  var mailOptions = {
                                        to: user.email,
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
                                    title: 'An error occurred',
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

exports.resetPassword = (req, res)=>{
  console.log(req.body);
  user.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } },(err,user)=>{

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
      user.password = req.body.password;
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

exports.editProfile = (req,res)=>{
        var token=req.body.userToken;
        jwt.verify(token,"pickup", function (err, decoded){

          if (err)
          {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          }

          user.findOne({email:decoded.email},(err,user)=>{

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
              user.firstname=req.body.firstname;
              user.lastname= req.body.lastname;
              user.email= req.body.email;
              user.contact= req.body.contact;
              user.dob= req.body.dob;
              user.postalCode= req.body.postalcode;
              user.address=req.body.address;
              user.city=req.body.city;

              user.save((err,user)=>{

               if (err) {
                         return res.status(500).json({
                             title: 'An error occurred',
                             error: err
                         });
                     }
                     res.status(200).json({
                         title: 'user updated Succesfully',
                         userId:user._id
                     });


              });


          });



        });

}
