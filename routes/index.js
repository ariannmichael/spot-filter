var express = require('express');
var router = express.Router();
var albumRouter = require('./album.route');

/* GET home page. */
router.use('/album', albumRouter);

module.exports = router;
