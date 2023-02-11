const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formSchema = new Schema({
    Gender:{
        type:Number,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    Height:{
        type:Number,
        required:true   
    },
    Weight:{
        type:Number,
        required:true
    },
    FHWOW:{
        type:Number,
        required:true
    },
    FAVC:{
        type:Number,
        default:1
    },
    NO_OF_MEALS :{
        type:Number,
        required:true
    },
    PRIMARY_MEALS :{
        type:Number,
        required:true
    },
    WATERINTAKE :{
        type:Number,
        required:true
    },
    FAF:{
        type:Number,
        required : true
    }
},{timestamps : true});
const form = mongoose.model('form',formSchema)
module.exports = form;