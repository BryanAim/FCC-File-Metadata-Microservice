'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');

// Set Multer storage
// Dont use for now
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

var upload = multer({ dest: 'uploads/' })


// create express app
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Handling file uploads with multer
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next)=>{
  const file = req.file
  if (req.file) {
    res.status(200).json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  } else {
   res.status(500).json({
     Error: "No file was provided in the 'data' field"
   })
  }
})

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
