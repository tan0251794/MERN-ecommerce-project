const router = require('express').Router();
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/img/upload')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage })

router.route('/').post( upload.single("file"),(req, res) => {
    res.send(req.file)
})

module.exports = router;