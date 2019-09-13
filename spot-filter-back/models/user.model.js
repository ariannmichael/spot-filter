var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    display_name: {
        type: String
    },
    genresID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    albumsID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }],
    artistsID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }]
});

var User = mongoose.model('user', userSchema);
module.exports = User;