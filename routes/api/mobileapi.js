var express = require('express');
var router = express.Router();
var User =  require('../../module/user');
var Cafe =  require('../../module/cafe');
var Noti = require('../../module/notification');
var CoffeeShop = require('../../module/coffeeShop');
var Order = require('../../module/order');
var jwt = require('jsonwebtoken');


router.get('/', function (req, res) {

     res.send('Api of Pickcup');
});

router.post('/signup', function (req, res) {

     User.signup(req,res);
});

router.post('/signin', function (req, res, next) {
  console.log("req.body signin");
  console.log(req.body)
     User.signin(req,res);
});

router.post('/forgotPassword', function (req, res, next) {
  console.log("req.body forgotPassword");
  console.log(req.body)
     User.forgotPassword(req,res);
});

router.post('/resetPassword', function (req, res, next) {

     User.resetPassword(req,res);
});

router.post('/editProfile', function (req, res, next) {

     User.editProfile(req,res);
});

// router.use(function (req, res, next) {
//
//   var token=req.body.userToken;
//   jwt.verify(token,"pickup", function (err, decoded){
//
//     if (err) {
//               return res.status(500).json({
//                   title: 'User not verified',
//                   error: err
//               });
//           }
//        next();
//   });
//
// });

router.post('/cafelisting', function (req, res, next) {

     Cafe.cafelisting(req,res);
});
router.post('/menulisting', function (req, res, next) {

     Cafe.menulisting(req,res);
});
router.post('/coffeeShopLogin', function (req, res, next) {

     Cafe.coffeeShopLogin(req,res);
});

router.post('/coffeeShopLogout', function (req, res, next) {

     Cafe.coffeeShopLogout(req,res);
});

router.post('/coffeeShopForgotPassword', function (req, res, next) {

      Cafe.coffeeShopForgotPassword(req,res);
});

router.post('/coffeeShopResetPassword', function (req, res, next) {

      Cafe.coffeeShopResetPassword(req,res);
});


router.post('/coffeeShopSetStatus', function (req, res, next) {

      Cafe.coffeeShopSetStatus(req,res);
});

router.post('/notificationListing', function (req, res, next) {

      Cafe.notificationListing(req,res);
});

router.post('/ListNotification', function (req, res, next) {

      Noti.ListNotification(req,res);
});
router.post('/createNoti', function (req, res, next) {

      Noti.createNoti(req,res);
});

router.post('/coffeeShopGetMenu', function (req, res, next) {

      CoffeeShop.coffeeShopGetMenu(req,res);
});


router.post('/coffeeShopAddCategory', function (req, res, next) {

      CoffeeShop.coffeeShopAddCategory(req,res);
});

router.post('/coffeeShopaddMenu', function (req, res, next) {

      CoffeeShop.coffeeShopaddMenu(req,res);
});

router.post('/coffeeShopeditMenu', function (req, res, next) {

      CoffeeShop.coffeeShopeditMenu(req,res);
});

router.post('/coffeeShopdeleteMenu', function (req, res, next) {

      CoffeeShop.coffeeShopdeleteMenu(req,res);
});

router.post('/coffeeShopsetrewardLogic', function (req, res, next) {

      CoffeeShop.coffeeShopsetrewardLogic(req,res);
});

router.post('/coffeeShopgetRewardData', function (req, res, next) {

      CoffeeShop.coffeeShopgetRewardData(req,res);
});

router.post('/coffeeShopshowRewardListing', function (req, res, next) {

      CoffeeShop.coffeeShopshowRewardListing(req,res);
});

// router.post('/userPrepareOrder', function (req, res, next) {

//       CoffeeShop.userPrepareOrder(req,res);
// });

module.exports = router;
