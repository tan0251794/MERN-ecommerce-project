const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    ten_sp: {type: String, required: true},
    so_danhgia: {type: Number},
    diem_danhgia: {type: Number},
    mo_ta: {type: String},
    da_ban: {type: Number},
    gia: {type: Number, required: true},
    hang_ton: {type: Number, required: true},
    hinh: {type: String},
    id_shop: {type: String, required: true},
    smallName: {type: String},
    bigName: {type: String, default: " "},
    luot_xem: {type: Number, default: 0},
    danhGia: {type: Array, default: []},
}, {timestamps: true}); 


const Product = mongoose.model('Product', productSchema);

module.exports = Product;