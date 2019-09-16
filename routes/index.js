var express = require('express');
var router = express.Router();
var albumRouter = require('./album.router');
var genreRouter = require('./genre.router');
var controller = require('../controllers/controller');
var artistRouter = require('../routes/artist.router');


/* GET album by Genre */
router.use('/album', albumRouter);
router.use('/artist', artistRouter);
router.use('/genre', genreRouter);
router.get('/login', controller.login);
router.get('/callback', controller.callback);
router.get('/logout', controller.logout);
router.get('/fillByGenre', controller.fillByGenre);

module.exports = router;
