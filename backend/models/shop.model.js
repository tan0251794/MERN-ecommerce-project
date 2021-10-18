const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopSchema = new Schema({
    ten_shop: {type: String, required: true},
    anh_avatar: {type: String},
    anh_cover: {type: String},
    so_theodoi: {type: Number},
    so_danhgia: {type: Number},
    diem_danhgia: {type: Number},
    mo_ta: {type: String, required: true},
    ngay_thamgia: {type: Date, required: true},
    sanpham : { type: Array}
}, {timestamps: true}); 


const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;