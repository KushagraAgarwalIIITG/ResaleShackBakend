const mongoose= require( 'mongoose');
const { Schema,ObjectId } = mongoose;
var uniqueValidator = require('mongoose-unique-validator');
const reviewAdsSchema = new Schema({
    ad:
    {
        type: ObjectId,
        ref : "Ad",
        required: true,
    },
    
});
reviewAdsSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports= mongoose.model("ReviewAds",reviewAdsSchema);