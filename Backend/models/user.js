const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
var uniqueValidator = require('mongoose-unique-validator');
const userSchema = new Schema({
   name:
   {
      type: String,
      required: true,
      trim: true
   },
   email:
   {
      type: String,
      required: true,
      unique: true
   },
   encry_password:
   {
      type: String,
      required: true,
   },
   salt: String,
   rollnumber:
   {
      type: String,
      required: true,
      trim: true,
      unique: true,
   },
   roomnumber:
   {
      type: String,
      required: true,
      trim: true,
   },
   batch:
   {
      type: String,
      required: true,
   },
   role:
   {
      type: Number,
      default: 0,
   },
   phonenumber:
   {
      type: String,
      required: true,
   },


}, { timestamps: true });
userSchema.virtual("password")
   .set(function (password) {
      this._password = password;
      this.salt = uuidv4();
      this.encry_password = this.securePassword(password);
   })
   .get(function () {
      return this._password;
   });
userSchema.methods = {


   authenticate: function (plainpassword) { return this.securePassword(plainpassword) === this.encry_password },
   securePassword: function (plainpassword) {
      if (!plainpassword) return "";
      try {
         return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex");
      }
      catch (err) { return ""; }
   }
};
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.model("User", userSchema);