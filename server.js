'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');

// Set Multer storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, fike, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({storage: storage})


// create express app
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));



app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
