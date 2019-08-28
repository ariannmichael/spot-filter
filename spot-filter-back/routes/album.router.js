var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');

router.get('/fillAlbumsByGenre', controller.fillAlbumsByGenre);
router.get('/getAlbumsByGenre', controller.getAlbumsByGenre);

module.exports = router;