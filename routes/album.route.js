var express = require('express');
var router = express.Router();
var albumController = require('../controllers/album.controller');

router.get('/getAlbums', albumController.getAlbums);

module.exports = router;