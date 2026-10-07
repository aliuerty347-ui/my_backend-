const express=require("express")
const { string, required } = require("joi")
const mongoose=require("mongoose")
// const Schema=mongoose.Schema
const postSchema=new mongoose.Schema({
image:{
    type:String
},
title:{
type:String,
required:true,
},
auther:{
    type:String,
    // required:true,
},
likes:{
type:Number,

},
comments: [
    {
      commentText: { type: String, required: true },
      userSub: { type: String, required: true },
      createdAt: { type: Date, default: Date.now } // اختياري: لحفظ وقت التعليق
    }
  ],

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Infous'
}
})
const inforPost=mongoose.model("inforPost",postSchema)
module.exports=inforPost