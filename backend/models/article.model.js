const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// collection init
const articleSchema = new Schema({
    ten_bai_viet: {type: String, required: true},
    noi_dung : { type: String},
}, {timestamps: true}); 

//create model in mongoDB
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;