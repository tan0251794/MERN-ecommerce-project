const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const smallSchema = new Schema({
    ten_danh_muc: {type: String, required: true, unique: true},
    id_cha: {type: String, required: true},
}, {timestamps: true}); 


const Small = mongoose.model('SmallCategory', smallSchema);

module.exports = Small;