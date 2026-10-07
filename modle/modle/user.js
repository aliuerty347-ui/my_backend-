
const { required } = require("joi")
const mongoose =require("mongoose")
const Schema=mongoose.Schema
const userschema=new Schema({

    userN:{
    type:String,
    required:true,
},
    passW:{
    type:String,
    required:true,
    },
    role:{
        type:String,
    }
    

})
const Infous=mongoose.model("infous",userschema)
module.exports=Infous
