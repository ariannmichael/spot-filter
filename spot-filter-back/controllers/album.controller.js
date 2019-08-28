const mongoose = require('mongoose');
var _ = require('lodash');
var Album = require('../models/album.model');
var Genre = require('../models/genre.model');
var GenreAlbum = require('../models/genre-album.model');
var SpotifyWebApi = require('spotify-web-api-node');

var LIMIT_ALBUMS = 10;
var OFF_SET_ALBUMS = 0;


var scopes = ['user-library-read']

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '35f8a82afeae4b46ad0833e742bf0c45',
  clientSecret: '181a34b83d43458c9e8af848524b70da',
  redirectUri: 'http://localhost:8080/callback'
});

exports.login = async function(req, res) {
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes); 
  res.redirect(authorizeURL);
}

exports.callback = async function(req, res) {
  let code = req.query.code || null;
    
  spotifyApi.authorizationCodeGrant(code).then(
      function(data) {
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        res.redirect('http://localhost:3000/home');
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
  );
}



exports.getAlbumsByGenre = async function(req, res) {
    const genreID = req.query.id;
    
    GenreAlbum.find({genreID}, (err, genreAlbum) => {
        let albumsID = [];
        genreAlbum.map(item => albumsID.push(item.albumID));
        
        Album.find({_id: {$in: albumsID}}, (err, albums) => {
            res.json(albums);            
        });        
    })
}

exports.fillAlbumsByGenre = async function(req, res) {    
    return await spotifyApi.getMySavedAlbums({
        limit: LIMIT_ALBUMS,
        offset: OFF_SET_ALBUMS
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

                    saveAlbum(newAlbum);
                    saveGenre(genres, newAlbum);
                })
            }
        });      
        
        //offset albums searched based on search limit
        OFF_SET_ALBUMS += LIMIT_ALBUMS;
        return res.status(200).send({message:"Albums filled with success"});
    })
    .catch(err => console.log('Something went wrong Get Albums!', err));
}


function saveAlbum(newAlbum) {
    // save album
    const albumName = newAlbum.album.name;
    Album.find({"album.name": albumName}, (err, us) => {}).then(element => {
        // album doesn't exist on db
        if(element.length == 0) {
            newAlbum.save();
        }                        
    })
}

function saveGenre(genres, newAlbum) {
    //save genre
    genres.map(genre => {
        Genre.find({genre}, (err, us) => {}).then(element => {
            // genre doesn't exist on db
            if(element.length == 0) {
                let newGenre = new Genre({genre});
                newGenre.save();


                //save genre and album relation
                let newGenreAlbum = new GenreAlbum({genreID: newGenre._id, albumID: newAlbum._id});
                newGenreAlbum.save();
            } else {
                // genre already exists, add a new album to genre
                const genreID = element[0]._id;
                
                let newGenreAlbum = new GenreAlbum({genreID, albumID: newAlbum._id});
                newGenreAlbum.save();
            }
        })
    })
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
