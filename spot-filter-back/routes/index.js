var express = require('express');
var router = express.Router();
var albumRouter = require('./album.router');
var genreRouter = require('./genre.router');

/* GET album by Genre */
router.use('/album', albumRouter);
router.use('/genre', genreRouter);

module.exports = router;
