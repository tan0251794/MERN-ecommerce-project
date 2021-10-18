const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const billSchema = new Schema({
    sanpham: {
        type: Array, 
        required: true, 
    },
    id_buyer: {
        type: String, 
        required: true, 
    },
    total_price: {
        type: Number, 
        required: true, 
    },
}, {timestamps: true}); 

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;