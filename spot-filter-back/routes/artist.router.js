var express = require('express');
var router = express.Router();
var artistController = require('../controllers/artist.controller');

router.get('/getArtists', artistController.getArtistsByGenre);

module.exports = router;