var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({ 
    added_at: '2018-12-14T02:57:09Z',
    album:
        { album_type: {
            type: String,
            default: 'album'
        },
        artists: [Array],
        available_markets: [Array],
        copyrights: [Array],
        external_ids: [Object],
        external_urls: [Object],
        genres: [],
        href: 'https://api.spotify.com/v1/albums/6NkW7NJXhortApUff8Op9n',
        id: '6NkW7NJXhortApUff8Op9n',
        images: [Array],
        label: 'Dawaiku Records',
        name: 'Mahandini',
        popularity: 27,
        release_date: '2018-12-10',
        release_date_precision: 'day',
        total_tracks: 7,
        tracks: [Object],
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