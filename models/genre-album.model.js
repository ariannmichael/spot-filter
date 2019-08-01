var mongoose = require('mongoose');

var genreAlbumSchema = new mongoose.Schema({
    genreID: {
        type: String,
        default: ''
    },
    albumID: {
        type: String,
        default: ''
    }
});

var GenreAlbum = mongoose.model('genreAlbum', genreAlbumSchema)
module.exports = GenreAlbum;