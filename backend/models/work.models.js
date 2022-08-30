import mongoose from "mongoose";

const {Schema} = mongoose
const work = new Schema({
    id:String,
    author:String,
    title:String,
    status:String,

},{timestamps:true});


export const Work = mongoose.model('Work',work);