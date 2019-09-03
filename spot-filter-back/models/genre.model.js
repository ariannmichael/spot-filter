var mongoose = require('mongoose');

var genreSchema = new mongoose.Schema({
    genre: {
        type: String
    },
    albumsID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }],
    artistsID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }]
});

var Genre = mongoose.model('genre', genreSchema);
module.exports = Genre;