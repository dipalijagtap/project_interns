const mongoose = require("mongoose")

const collegeModel = new  mongoose.Schema ({

    name :{
  type : String,
  require: true,
  trim : true,
  lowercase : true,
  unique : true

    },
 fullName :{
 type : String,
 trim : true,
 require : true

 },
 logoLink :{
type:String,
require: true

 },
 isDeleted :{
     type : Boolean,
     default : false
 }



},{timestamps : true})   

 module.exports = mongoose.model("college",collegeModel);