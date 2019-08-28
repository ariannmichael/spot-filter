var express = require('express');
var router = express.Router();
var albumRouter = require('./album.router');
var genreRouter = require('./genre.router');
var albumController = require('../controllers/album.controller');



/* GET album by Genre */
router.use('/album', albumRouter);
router.use('/genre', genreRouter);
router.get('/login', albumController.login);
router.get('/callback', albumController.callback);

module.exports = router;
