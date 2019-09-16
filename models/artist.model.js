var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    external_urls: {},
    followers : {},
    genres: [],
    href: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
    images : [],
    name: {
        type: String,
        default: ''
    },
    popularity: {
        type: Number
    },
    type: {
        type: String,
        default: ''
    },
    uri: {
        type: String,
        default: ''
    }
});

var Artist = mongoose.model('artist', artistSchema);
module.exports = Artist;