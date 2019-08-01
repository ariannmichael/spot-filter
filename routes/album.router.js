var express = require('express');
var router = express.Router();
var albumController = require('../controllers/album.controller');

router.get('/setAlbumsGenre', albumController.setAlbumGenre);

module.exports = router;