var express = require('express');
var router = express.Router();
var albumController = require('../controllers/album.controller');

router.get('/getAlbumsGenre', albumController.getAlbumsGenre);
router.get('/fillAlbumsByGenre', albumController.fillAlbumsByGenre);

module.exports = router;