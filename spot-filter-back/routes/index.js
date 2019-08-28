var express = require('express');
var router = express.Router();
var albumRouter = require('./album.router');
var genreRouter = require('./genre.router');
var controller = require('../controllers/controller');



/* GET album by Genre */
router.use('/album', albumRouter);
router.use('/genre', genreRouter);
router.get('/login', controller.login);
router.get('/callback', controller.callback);

module.exports = router;
