const mongoose= require ('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require ('bcrypt');
const jwt= require ('jsonwebtoken');
const Constants = require('../../config/constants');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   
    orderDate:Date,
    channel:String,
    storeName:String,
    status:String,
    amount:Number,
    payment:String,
    productName:String,
  
    quantity:String,
    orderCreater:{
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    pickupAddress:String,
    deliveryAddress:String,
    customer:{
      _id:false,
      name:String,
      email:String,
      mobile:String,
      countryCode:String,
      address:String,
      address2:String,
      pincode:Number,
      country:String,
      state:String,
      city:String,
    },
    productInformation:[{
      _id:false,
      sku:String,
      hsn:String,
      productName:String,
      quantity:Number,
      price:Number,
      discount:Number,
      gst:Number,
    }],
    weight:Number,
    length:Number,
    breadth:Number,
    height:Number,
    volumetricWeight:Number,
    invoiceAmount:Number,
    totalAmount:Number,
    reSellerName:String,
   
  }, {
    timestamps: true,
  });

  orderSchema.plugin(autoIncrement.plugin, {
    model: 'order',
    field: 'orderID',
    startAt: 1000,
    incrementBy: 1
  });

  const userBasicModel = mongoose.model('order', orderSchema);
module.exports= userBasicModel;