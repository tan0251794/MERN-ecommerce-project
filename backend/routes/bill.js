const router = require('express').Router();
let Bill = require('../models/bill.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    Bill.find().then(bills => res.json(bills)).catch(err => res.status(400).json('Error: ' + err));
})


router.route('/add').post((req, res) => {

    const sanpham = req.body.sanpham;
    const id_buyer = req.body.id_buyer;
    const total_price = req.body.total_price;

    const newBill = new Bill({ sanpham, id_buyer, total_price });
    newBill.save().then(bill => {

        User.findById(id_buyer)
            .then(user => {
                user.userBill.push(bill)
                user.save()
            })
            .then(() => res.json('User has added bill!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    )
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/delete/:id').delete((req, res) => {

    Bill.findByIdAndDelete(req.params.id).then(() => res.json(`${req.params.id} Deleted!`)).catch(err => res.status(400).json('Error: ' + err));
})


router.route('/findById').post((req, res) => {
    Bill.findOne({ _id: req.body.inputId }).then(bill => res.json(bill)).catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;