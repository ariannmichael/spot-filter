const mongoose = require('mongoose');
var _ = require('lodash');
var Album = require('../models/album.model');
var Genre = require('../models/genre.model');
var GenreAlbum = require('../models/genre-album.model');

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: ' 35f8a82afeae4b46ad0833e742bf0c45',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://localhost:8080'
});


const USER_TOKEN = 'BQDeeNWwwB6qHidfOtDwo8jN824O3zE-Wv2Q2n6x71eum0guW54wgX3vw_BwDINX-lzyNoHucqDB_UiiUaE1zDNZJFthicWCOdHVab_dM0UT5QMH6Z6KVGkvEAF5gtMxzZIEZh2Tau1VjATjmXFVIj2I2BaICEp8KkofqNTNfpoTsQ';
spotifyApi.setAccessToken(USER_TOKEN);


exports.getAlbumsGenre = async function(req, res) {
    let albumsGenre = [];

    Album.find({}, (err, albums) => {})
    .then(result => {
        result.map(item => {
            let genres = item.album.genres;
            // let genreAlbum = new GenreAlbum({genres, albumID: item._id});


            // genreAlbum.save();
            

            genres.map(genre => {
                if(genre.includes('metal')) {
                    albumsGenre.push(item);
                }
            })
        });
    })
    .then(result => res.status(200).send({message:"Albums filled with success", data: albumsGenre}))
    .catch(err => console.log('Something went wrong Genre!', err));
}

exports.fillAlbumsByGenre = async function(req, res) {    
    return await spotifyApi.getMySavedAlbums({
        limit: 5,
        offset:0
    })
    .then(data => {
        data.body.items.map(item => { 
            if(item.genres != null) {                
                let album = new Album(item);

                album.save();
            } else {
                getArtistGenre(item).then(genres => {
                    let newAlbum = new Album(item);
                    newAlbum.album.genres = genres;
                    
                    newAlbum.save();
                });
            }
        });  

        return res.status(200).send({message:"Albums filled with success"});
    })
    .catch(err => console.log('Something went wrong Get Albums!', err));

}

async function getArtistGenre(item) {

    let artist = item.album.artists;
    artistID = artist[0].id;
    
    return await getArtistInfo(artistID).then(res => res);
}

async function getArtistInfo(artistID) {
    return await spotifyApi.getArtist(artistID)
        .then(data => {
            let artistInfo = data.body;
            return getGenre(artistInfo);
        })
        .then(res => {
            
            return res;
        })
        .catch(err => console.log('Something went wrong Artist Info!', err));
}

function getGenre(artistInfo){
    return artistInfo.genres;
}
