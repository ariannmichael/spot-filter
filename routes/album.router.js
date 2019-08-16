var express = require('express');
var router = express.Router();
var albumController = require('../controllers/album.controller');

router.get('/fillAlbumsByGenre', albumController.fillAlbumsByGenre);
router.get('/sortAlbumsGenre', albumController.sortAlbumsGenre);
router.get('/getAlbumsByGenre', albumController.getAlbumsByGenre);

module.exports = router;