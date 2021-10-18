const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// collection init
const bigSchema = new Schema({
    ten_danh_muc: {type: String, required: true, unique: true},
    danh_muc_con: {type: Array},
}, {timestamps: true}); 

//create model in mongoDB
const Big = mongoose.model('BigCategory', bigSchema);

module.exports = Big;