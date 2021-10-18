const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true,
    },
    password: {
        type: String, 
        required: true, 
        minlength: 6
    },
    firstName: {
        type: String, 
        required: true, 
        minlength: 3
    },
    lastName: {
        type: String, 
        required: true, 
        minlength: 3
    },
    phoneNo: {
        type: String, 
        required: true, 
        minlength: 9
    },
    address: {
        type: String, 
        required: true, 
        minlength: 3
    },
    shopId: {
        type: String, 
    },
    userCart: {
        type: Array, 
    },
    userBill: {
        type: Array, 
    },
    deactive: {
        type: Boolean, 
        default: false
    },

}, {timestamps: true}); 


const User = mongoose.model('User', userSchema);

module.exports = User;