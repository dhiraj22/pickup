var cafeListing = require('../models/cafeListing');
var menuListing = require('../models/menuListing');
var reward = require('../models/reward');

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var IterateObject = require("iterate-object");
var moment = require('moment');
var timeFormat=moment().format();
console.log(timeFormat);

exports.coffeeShopGetMenu = (req,res)=>{

    var token=req.body.userToken;
    var decoded = jwt.decode(token, "pickup");
   console.log(decoded);
   console.log("decoded");


      menuListing.findOne({ "shopName": decoded.data.id}).exec(function (err,shopMenu){
        if (err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!shopMenu)
        {
            return res.status(500).json({
                title: 'No shop found',

            });
        }

        res.status(200).json({
            title: 'Listing of cafe menu',
            cafes: shopMenu

        });
     });

}

exports.coffeeShopAddCategory = (req,res)=>{

    var token=req.body.userToken;
    var decoded = jwt.decode(token, "pickup");
   console.log(decoded);
   console.log("decoded");
        var newCategory = req.body.category;

     console.log(newCategory);
    menuListing.findOne({ "shopName": decoded.data.id}).exec(function (err,coffeeShop){

      if (err)
      {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }

      if(coffeeShop)
      {
          // coffeeShop['category'][newCategory]=[];
          // var data= new Object();
          // data[newCategory]=[];

          coffeeShop['category'][newCategory] = [];
          coffeeShop.markModified('category');
          coffeeShop.save((err,saved)=>{

           if (err) {
                     return res.status(500).json({
                         title: 'An error occurred while adding data to existing menu',
                         error: err
                     });
                 }
                 res.status(201).json({
                     message: 'New category added to the existing item',
                     data: saved
                 });

          });
      }
      else {
        var datatoPush = new Object();
        datatoPush['shopName'] = decoded.data.id;
        datatoPush['category'] = new Object();
        datatoPush['category'][newCategory] = [];
        var addCategory = new menuListing(datatoPush);

        addCategory.save((err,saved)=>{

         if (err) {
                   return res.status(500).json({
                       title: 'An error occurred while adding new category',
                       error: err
                   });
               }
               res.status(201).json({
                   message: 'New category added ',
                   data: saved
               });

        });


      }



    });



}

exports.coffeeShopaddMenu = (req,res)=>{

    var token=req.body.userToken;
    var decoded = jwt.decode(token, "pickup");
   console.log(decoded);
   console.log("decoded");


     var itemCat=req.body.itemCat;

      menuListing.findOne({ "shopName": decoded.data.id}).exec(function (err,shopMenu){
        if (err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!shopMenu)
        {
            return res.status(500).json({
                title: 'No shop found',

            });
        }

         var checkIfCatPresent =shopMenu.category[itemCat];
         console.log(checkIfCatPresent);
         if(!checkIfCatPresent)
         {
           return res.status(500).json({
               title: 'No such category found',

           });
         }
          var newItem={
            _id:new ObjectId,
            itemName:req.body.itemName,
            itemPrice:req.body.itemPrice,
            itemSmallPrice:req.body.itemSmallPrice,
            itemMediumPrice:req.body.itemMediumPrice,
            itemLargePrice:req.body.itemLargePrice,
            }

         shopMenu.category[itemCat].push(newItem);
         shopMenu.markModified('category');
         shopMenu.save((err,saved)=>{

          if (err) {
                    return res.status(500).json({
                        title: 'An error occurred while adding new menu item',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'New item added ',
                    data: saved
                });

         });
     });

}

exports.coffeeShopeditMenu = (req,res)=>{

    var token=req.body.userToken;
    var decoded = jwt.decode(token, "pickup");
    console.log(decoded);
    console.log("decoded");


     var itemCat=req.body.itemCat;
     var editItemId=req.body.itemId;
     var editObject={
       _id:ObjectId(editItemId),
       itemName:req.body.itemName,
       itemPrice:req.body.itemPrice,
       itemSmallPrice:req.body.itemSmallPrice,
       itemMediumPrice:req.body.itemMediumPrice,
       itemLargePrice:req.body.itemLargePrice,
     };



         var itemCatId='category.' + itemCat + '._id';
         var itemCat='category.' + itemCat + '.$'
         var obj1={"shopName": decoded.data.id,
          [itemCatId]:ObjectId(editItemId)
         }

       menuListing.findOneAndUpdate(obj1,{$set:{[itemCat]:editObject}},(err,shopMenu)=>{
          // console.log(shopMenu);
          //   console.log(req.body);
          console.log("shopMenu");
        if (err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!shopMenu)
        {
            return res.status(500).json({
                title: 'No menu found',

            });
        }

        return res.status(201).json({
            title: 'record updated',

        });

     });

}

exports.coffeeShopdeleteMenu = (req,res)=>{

      var token=req.body.userToken;
      var decoded = jwt.decode(token, "pickup");
      console.log(decoded);
      console.log("decoded");
      var itemCat=req.body.itemCat;
      var deleteItemId=req.body.itemId;
      var itemCatId='category.' + itemCat + '._id';
      var itemCat='category.' + itemCat ;
      var obj1={"shopName": decoded.data.id,
          [itemCatId]:ObjectId(deleteItemId)
         }

       menuListing.findOneAndUpdate(obj1,{$pull:{[itemCat]:{ _id: ObjectId(deleteItemId) } }},(err,shopMenu)=>{
          // console.log(shopMenu);
          //   console.log(req.body);
          console.log("shopMenu");
        if (err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!shopMenu)
        {
            return res.status(500).json({
                title: 'No menu found',

            });
        }

        return res.status(201).json({
            title: 'record deleted',

        });

     });

}

exports.coffeeShopgetRewardData =(req,res)=>{

  var token=req.body.userToken;
  var decoded = jwt.decode(token, "pickup");
  var itemName=req.body.itemName;
  menuListing.findOne({ "shopName": decoded.data.id}).exec(function (err,store){


            if (err)
            {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if(!store)
            {
                return res.status(500).json({
                    title: 'No store found',

                });
            }
           var keysObject =Object.keys(store.category);
           var totalSize=keysObject.length;
           if(totalSize <= 0)
           {
             return res.status(500).json({
                 title: 'No category found',

             });
           }
           var itemData=[];
           IterateObject(store.category, function (value, name) {

                       var catData={
                         itemCategory:name,
                         itemData:value
                       }
                       itemData.push(catData);
                     })
             res.status(201).json({
                 title: 'Items with category',
                 data:itemData

             });


  });
}

exports.coffeeShopsetrewardLogic =(req,res)=>{

      var token=req.body.userToken;
      var decoded = jwt.decode(token, "pickup");
      var itemName=req.body.itemName;
      var itemId=req.body.itemId;
      var itemCat=req.body.itemCat;


      var rew = new reward({
        startdate:new Date(req.body.startdate),
        enddate:new Date(req.body.enddate),
        quantity:req.body.quantity,
        RewardItemDetail:{
          shopDetail:decoded.data.id,
          itemName:itemName,
          itemId:itemId,
          itemCat:itemCat
        }
      })

      rew.save((err,rewardSave)=>{

        if (err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        res.status(201).json({
            title: 'Reward Data set',
           });

      })


}

exports.coffeeShopshowRewardListing =(req,res)=>{

  var token=req.body.userToken;
  var decoded = jwt.decode(token, "pickup");

  reward.
  find({ "RewardItemDetail.shopDetail": decoded.data.id,"enddate":{"$gte": new Date()}})
  .exec(function (err,store){


            if (err)
            {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if(store.length <= 0)
            {
                return res.status(500).json({
                    title: 'No rewards found',

                });
            }

            return res.status(201).json({
                title: 'Rewards found',
                data:store

            });
  })
}
