const { timeStamp } = require("console")
const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId


const InternModel = new mongoose.Schema({

Name : {
    type : String,
    trim : true,
    require : true
},
email : {
    type : String,
    require : true,
    unique : true,
    match : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

},
Mobile :{
    type : Number,
    require : true,
    unique : true,
    match : /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
},
collegeId :{
  type : ObjectId,
  require:true,
  ref : "college"
},
isDeleted :{
    type : Boolean,
    default : false
}
//DeletedAt : {
  //  type : Date,
   // default : " "
//}



},{timestamps : true})

module.exports= mongoose.model("Intern", InternModel);
