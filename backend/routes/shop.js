const router = require('express').Router();
let Shop = require('../models/shop.model');

router.route('/').get((req, res) => {
    Shop.find().then(shops => res.json(shops)).catch(err => res.status(400).json('Error: ' + err));
})


router.route('/add').post((req, res) => {
    const ten_shop = req.body.ten_shop;
    const anh_avatar = "";
    const anh_cover = "";
    const so_theodoi = 0;
    const so_danhgia = 0;
    const diem_danhgia = 0;
    const mo_ta = "www.";
    const ngay_thamgia = new Date();
    const sanpham = [];

    const newShop = new Shop({ ten_shop, anh_avatar, anh_cover, so_theodoi, so_danhgia, diem_danhgia, mo_ta, ngay_thamgia, sanpham });
    newShop.save()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/findById').post((req, res) => {
    Shop.findOne({_id: req.body.inputId}).then(shop => res.json(shop)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/findByName').post((req, res) => {
    Shop.findOne({ten_shop: req.body.name}).then(shop => res.json(shop)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/delete/:id').delete((req,res) =>{
    Shop.findByIdAndDelete(req.params.id).then(() => res.json(`${req.params.id} Deleted!`)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/updateProduct').post((req, res) => {
    Shop.findById(req.body.inputId)
    .then(shop => {
        shop.sanpham.push(req.body.sanpham);
        shop.save()
    })
    .then(() => res.json('Shop updated!'))  
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/updateName').post((req, res) => {
    Shop.findById(req.body.inputId)
    .then(shop => {
        shop.ten_shop = req.body.ten_shop;
        shop.save()
    })
    .then(() => res.json('Shop updated!'))  
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/updateCover').post((req, res) => {
    Shop.findById(req.body.inputId)
    .then(shop => {
        shop.anh_cover = req.body.anh_cover;
        shop.save()
    })
    .then(() => res.json('Shop updated!'))  
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/updateDescription').post((req, res) => {
    Shop.findById(req.body.inputId)
    .then(shop => {
        shop.mo_ta = req.body.mo_ta;
        shop.save()
    })
    .then(() => res.json('Shop updated!'))  
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;