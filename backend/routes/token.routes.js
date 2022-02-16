
let express = require('express'),
multer = require('multer'),
mongoose = require('mongoose'),
router = express.Router();

// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


// User model
let Token = require('../models/Token');


// POST User
router.post('/create-token', upload.single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const token = new Token({
        // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: url + '/public/' + req.file.filename
});

token.save().then(result => {
  console.log(result);
  res.status(201).json({
    message: "Token registered successfully!",
    tokenCreated: {
      _id: result._id,
      name: result.name,
      avatar: result.avatar
    }
  })
}).catch(err => {
  console.log(err),
    res.status(500).json({
      error: err
    });
})
})

// GET All Tokens
router.get("/", (req, res, next) => {
    Token.find().then(data => {
    res.status(200).json({
        message: "Tokens retrieved successfully!",
        tokens: data
    });
    });
});


module.exports = router;