var mongoose = require('mongoose');

var genreSchema = new mongoose.Schema({
    genres: {
        type: []
    }
});

var Genre = mongoose.model('genre', genreSchema);
module.exports = Genre;