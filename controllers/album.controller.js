const mongoose = require('mongoose');
var _ = require('lodash');
var Album = require('../models/album.model');

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: ' 35f8a82afeae4b46ad0833e742bf0c45',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://localhost:8080'
});


const USER_TOKEN = 'BQCfnCf2GruRZ3l8b36B7FUzOcJB3qWHWwANgtJ8_sI45Y9OBzg5qxbhkpXxHrrN8m2pSZVCiHj5tvApjUvLl7-WAHbc9LOlf82EmWb3bA7jqp9Oq18hIwVnzjbnMprQNSXkoqO8sue1Yg4npIR173nR4wHnsd5v_3crXL_7DafgLA';
spotifyApi.setAccessToken(USER_TOKEN);


var albums = [];

exports.setAlbumGenre = async function(req, res) {
    spotifyApi.getMySavedAlbums({
        limit: 5,
        offset:0
    })
    .then(data => {
        data.body.items.map(item => { 
            if(item.genres != null) {                
                albums.push(new Album(item))               
            } else {
                getArtistGenre(item).then(genres => {
                    let newAlbum = new Album(item);
                    newAlbum.album.genres = genres;
                    
                    albums.push(newAlbum);                    
                });
            }
        });        
    })
    .catch(err => console.log('Something went wrong Get Albums!', err));

    setTimeout(() => {
        console.log(albums);
    }, 10000);
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
