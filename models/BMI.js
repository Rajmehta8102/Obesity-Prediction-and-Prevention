const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BMISchema = new Schema({
    Weight:{
        type:Number,
        required:true
    },
    Height:{
        type:Number,
        required:true   
    }
},{timestamps : true})
const BMI = mongoose.model('BMI',BMISchema)
module.exports = BMI;