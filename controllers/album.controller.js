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


const USER_TOKEN = 'BQA2rpu1agurRKEfi5kIF0OVHxWCfwyDhMAE9NbHCF1JNmbnBA32h4zE3YWUhjVwCZHLifwRrTvu6tsh4M_62yzZlkj-YexdM2mVXcgIOR1hoNzrddprpbt8T4d89NyexmDHSL4hrXF8FqUnIKA_Ho88wtHOQcyK0dNCRz7hASS_uA';
spotifyApi.setAccessToken(USER_TOKEN);


exports.getAlbumsGenre = async function(req, res) {
    Album.find({}, (err, albums) => {})
    .then(result => {
        result.map(item => {            
            let genres = item.album.genres;
            let genreAlbum = new GenreAlbum({genres, albumID: item._id});


            genreAlbum.save();
        });
    }).catch(err => console.log('Something went wrong Genre!', err));    
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
