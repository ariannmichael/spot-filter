var express = require('express');
var router = express.Router();
var albumRouter = require('./album.router');

/* GET album by Genre */
router.use('/album', albumRouter);

module.exports = router;
