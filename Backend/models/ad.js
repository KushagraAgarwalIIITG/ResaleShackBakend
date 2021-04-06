var mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const adSchema = new Schema({
    image:
    {
       data: Buffer,
       contentType : String
    },
    price:
    {
        type : Number,
        required : true,
    },
    title:
    {
        type : String,
        required : true,
        trim: true,
    },
    description:
    {
        type : String,
        required : true,
        trim: true,
    },
    reviewflag:
    {
        type: Boolean,
        default: false,
    },
    category:
    {
        type: ObjectId,
        ref : "Category",
        required: true,
    },
    user:
    {
        type: ObjectId,
        ref : "User",
        required: true,
    }
    
},{timestamps: true});
adSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports= mongoose.model("Ad",adSchema);