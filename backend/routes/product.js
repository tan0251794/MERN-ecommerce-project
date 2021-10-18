const router = require('express').Router();
let Product = require('../models/product.model');
let Small = require('../models/smallCategory.model');
let Shop = require('../models/shop.model');

router.route('/').get((req, res) => {
    Product.find().then(products => res.json(products)).catch(err => res.status(400).json('Error: ' + err));
})


router.route('/add').post((req, res) => {
    const ten_sp = req.body.ten_sp;
    const so_danhgia = 0;
    const diem_danhgia = 0;
    const mo_ta = req.body.mo_ta;
    const da_ban = 0;
    const gia = req.body.gia;
    const hang_ton = req.body.hang_ton;
    const hinh = req.body.hinh;
    const id_shop = req.body.id_shop;
    const bigName = req.body.bigName;
    const smallName = req.body.smallName;

    const newProduct = new Product({ ten_sp, so_danhgia, diem_danhgia, mo_ta, da_ban, gia, hang_ton, hinh, id_shop, bigName, smallName });
    newProduct.save().then(() => res.json(`${ten_sp} Created!`))

})

router.route('/findByShopID').post((req, res) => {
    Product.find({id_shop: req.body.inputId}).then(products => res.json(products)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/findById').post((req, res) => {
    Product.findOne({_id: req.body.inputId}).then(product => res.json(product)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/findByName').post((req, res) => {
    Product.findOne({ten_sp: req.body.name}).then(product => res.json(product)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/findByIdSmall').post((req, res) => {
    Product.find({id_small: req.body.id_small}).then(products => res.json(products)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/delete/:id').delete((req,res) =>{
    Product.findByIdAndDelete(req.params.id).then(() => res.json(`${req.params.id} Deleted!`)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/findByDate').post((req, res) => {
    Product.find({ 
        createdAt: {
            $gte: req.body.start, 
            $lt: req.body.end
        }
    }).then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/deleteAll').get((req, res) => {
    Product.remove().then(() => res.json('All products delete!'))
})


router.route('/upView').post((req, res) => {
    Product.findById(req.body.inputId)
    .then(product => {
        product.luot_xem += 1
        product.save()
    })
    .then(product => res.json(product))  
    .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/addComment').post((req, res) => {
    const review = {
        userName: req.body.name,
        comment: req.body.comment,
        star:  req.body.star,
        ngayDang: req.body.ngayDang
    }
    Product.findById(req.body.inputId)
    .then(product => {
        product.danhGia.push(review)
        product.save()
    })
    .then(product => res.json(product))  
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;