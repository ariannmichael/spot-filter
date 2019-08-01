var mongoose = require('mongoose');

var genreSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

var Genre = mongoose.model('genre', genreSchema);
module.exports = Genre;