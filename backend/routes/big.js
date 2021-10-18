const router = require('express').Router();
let Big = require('../models/bigCategory.model');
let Small = require('../models/smallCategory.model');

router.route('/').get((req, res) => {
    Big.find().then(bigs => res.json(bigs)).catch(err => res.status(400).json('Error: ' + err));
})


router.route('/add').post((req, res) => {
    const ten_danh_muc = req.body.ten_danh_muc;
    const newBig = new Big({ ten_danh_muc});
    newBig.save().then(big => res.json(big))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/delete/:id').delete((req,res) =>{
    Big.findByIdAndDelete(req.params.id).then(() => res.json(`${req.params.id} Deleted!`)).catch(err => res.status(400).json('Error: ' + err));
})


router.route('/findById').post((req, res) => {
    Big.findOne({_id: req.body.inputId}).then(big => res.json(big)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/addChild').post((req, res) => {
    const ten_danh_muc = req.body.ten_danh_muc;
    const id_cha = req.body.id_cha;

    const newSmall = new Small({ ten_danh_muc, id_cha});
    newSmall.save().then(small => {
        Big.findById(id_cha)
        .then(big => {
            big.danh_muc_con.push(small);
            big.save().then(() => res.json('sửa mảng big thành công!'))
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/deleteChild/:id').delete((req, res) => {
    const id_con = req.params.id;
    let id_cha = "";

    Small.findById(id_con)
    .then(small => {id_cha = small.id_cha})
    .catch(err => res.status(400).json('Error: ' + err));

    Small.findByIdAndDelete(id_con)
    .then(() => {
        Big.findById(id_cha)
        .then(big => {
            for( var i = 0; i < big.danh_muc_con.length; i++){
                if ( big.danh_muc_con[i]._id == id_con) { 
                    big.danh_muc_con.splice(i, 1); 
                }
            }
            big.save().then(() => res.json('sửa mảng big thành công!'))
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;