var mongoose = require('mongoose');

var genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        default: ''
    }
});

var Genre = mongoose.model('genre', genreSchema);
module.exports = Genre;