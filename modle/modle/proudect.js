const express=require("express")
const { required } = require("joi")
const { default: mongoose } = require("mongoose")
const moongose=require("mongoose")
const proudectSchema=new mongoose.Schema({
title:{
    type:String,
},
    slug:{
        type:String,
    },
    price: {
        type:Number,
    },
    description:{
        type:String
    },
   
    name:{
        type:String,
    },
    
    images:[

    ],
    creationAt:{
            type:Date,
        },
        likeCounter:{
            type:Number
        },
        
        comments:[
            {
            commentUser:{
                type:String,
                required:true

            },
            commentText:{
                type:String,
                required:true
            },
            createdAt: {
                 type: Date,
                  default: Date.now } // اختياري: لحفظ وقت التعليق

            }
        ]
        
        
    
})
        const inforProudect=mongoose.model("inforProudect",proudectSchema)
module.exports=inforProudect
