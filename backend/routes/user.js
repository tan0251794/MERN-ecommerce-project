const router = require('express').Router();
let User = require('../models/user.model');
let Shop = require('../models/shop.model');
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/deleteAll').get((req, res) => {
    User.remove().then(() => res.json('All user delete!'))
})
router.route('/add').post((req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNo = req.body.phoneNo;
    const address = "...";
    const shopId = "...";

    var userID = ""

    const newUser = new User({ email, password, firstName, lastName, phoneNo, address, shopId });
    newUser.save()
        .then(user => {

            userID = user._id;
            const ten_shop = userID + "Shop";
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
                .then(shop => {
                    console.log(userID);

                    User.findById(userID)
                        .then(user => {
                            user.shopId = shop._id;
                            user.save()
                        })
                        .then(() => res.json('User updated!'))
                }) 
        })
        .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/findById').post((req, res) => {
    User.findOne({ _id: req.body.inputId }).then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/findByEmail').post((req, res) => {
    User.findOne({ email: req.body.email }).then(user => res.json(user)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => res.json(`${req.params.id} Deleted!`)).catch(err => res.status(400).json('Error: ' + err));
})


router.route('/updatePass').post((req, res) => {
    User.findById(req.body.inputId)
        .then(user => {
            user.password = req.body.password;
            user.save()
        })
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/updateInfo').post((req, res) => {
    User.findById(req.body.inputId)
        .then(user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.phoneNo = req.body.phoneNo;
            user.address = req.body.address;
            user.save()
        })
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/updateDeactive').post((req, res) => {
    User.findById(req.body.inputId)
        .then(user => {
            user.deactive = true;
            user.save()
        })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/updateActive').post((req, res) => {
    User.findById(req.body.inputId)
        .then(user => {
            user.deactive = false;
            user.save()
        })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/login').post((req, res) => {
    const query = {
        "email": req.body.email,
        "password": req.body.password
    }

    User.findOne(query)
        .then(
            user => { res.json(user), xuly1(user) }
        )
        .catch(err => res.status(400).json('Error: ' + err));

    function xuly1(users) {
        if (!users) {
            console.log("not found");
        } else {
            console.log("found");
        }


    }
})

router.route('/addCart').post((req, res) => {
    Product.findOne({ _id: req.body.productId })
        .then(product => {
            User.findById(req.body.userId)
                .then(user => {
                    var productName = product.ten_sp
                    var productPrice = product.gia
                    var productId = product._id
                    var productImg = product.hinh
                    var productShop = product.id_shop
                    const productData = {
                        productId: productId,
                        productName: productName,
                        productPrice: productPrice,
                        productImg: productImg,
                        productShop: productShop,
                        quantily: 1
                    }
                    var newProduct = true;

                    if (user.userCart.length != 0 ) {
                        console.log(user.userCart.length);
                        for (let index = 0; index < user.userCart.length; index++) {
                            const sp = user.userCart[index];
                            if (sp.productId.toString() == productId) {
                                newProduct = false;
                                user.userCart[index].quantily = sp.quantily + req.body.quantily; //thêm số lượng
                                user.markModified('userCart');
                                user.save()
                                .then(user => res.json(user))
                            }
                        }
                    }
                    else {
                        user.userCart.push(productData);
                        user.save().then(user => res.json(user))
                    }

                    if (user.userCart.length != 0 && newProduct) {
                        user.userCart.push(productData);
                        user.save().then(user => res.json(user))
                    }

                })
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/removeCart').post((req, res) => {
    User.findById(req.body.userId)
                .then(user => {
                    var spliceIndex;
                    console.log(user);
                    for (let index = 0; index < user.userCart.length; index++) {
                        const sp = user.userCart[index];
                        if (sp.productId.toString() == req.body.productId) {
                            spliceIndex = index;
                        }
                    }
                    console.log(spliceIndex);
                    user.userCart.splice(spliceIndex, 1);
                    user.markModified('userCart');
                    user.save()
                    .then(user => res.json(user))
            })
            .catch(err => res.status(400).json('Error: ' + err));
        })

router.route('/removeAllCart').post((req, res) => {
    User.findById(req.body.userId)
                .then(user => {
                    user.userCart = []
                    user.save()
                    .then(user => res.json(user))
                })
                .catch(err => res.status(400).json('Error: ' + err));
            })
module.exports = router;