var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({ 
    added_at: {
        type: String
    },
    album:
        { album_type: {
            type: String,
            default: 'album'
        },
        artists: {},
        available_markets: {},
        copyrights: {},
        external_ids: {},
        external_urls: {},
        genres: [],
        href: {
            type: String
        },
        id: {
            type: String
        },
        images: {},
        label: {
            type: String
        },
        name:{
            type: String
        },
        popularity: {
            type: Number
        },
        release_date:{
            type: String
        },
        release_date_precision:{
            type: String
        },
        total_tracks:{
            type: Number
        },
        tracks: {},
        type: {
            type: String,
            default: 'album'   
        },
        uri: {
            type: String
        }
    } 
});

var Album = mongoose.model('album', albumSchema);
module.exports = Album;