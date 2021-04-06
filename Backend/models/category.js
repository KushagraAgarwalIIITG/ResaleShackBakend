var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const categorySchema = new Schema({
    name :
    {
        type : String,
        required : true,
        trim : true
    },
    
    ads :
    {
        type : Array,
        deafult : [],
    }

});
categorySchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports= mongoose.model("Category",categorySchema);