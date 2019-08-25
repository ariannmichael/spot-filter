var express = require('express');
var router = express.Router();
var genreController = require('../controllers/genre.controller');

router.get('/getGenres', genreController.getGenres);

module.exports = router;