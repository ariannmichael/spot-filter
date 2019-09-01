const mongoose = require('mongoose');
var _ = require('lodash');
var Album = require('../models/album.model');
var Genre = require('../models/genre.model');
// var Genre = db.Genre;
var SpotifyWebApi = require('spotify-web-api-node');
Genre.createCollection();

var LIMIT_ALBUMS = 50;
var OFF_SET_ALBUMS = 0;

var displayName = '';

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
        return spotifyApi.getMe();
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
  ).then(function(data) {
    displayName = data.body['display_name']
    res.redirect('http://localhost:3000/home');
  })
}

exports.getDisplayName = async function(req, res) {
    res.json({displayName});
}

exports.getAlbumsByGenre = async function(req, res) {
    const genreID = req.query.id;    

    Genre.find({_id: genreID}, (err, genre) => {        
        let albumsID = genre[0].albumsID        

        Album.find({_id: {$in: albumsID}}, (err, albums) => {
            res.json(albums);            
        });
    })
}

exports.logout = async function(req, res) {
    mongoose.connection.db.dropDatabase();
}

exports.fillAlbumsByGenre = async function(req, res) {    
    const response = await spotifyApi.getMySavedAlbums({
        limit: LIMIT_ALBUMS,
        offset: OFF_SET_ALBUMS
    })

    const albums = await response.body.items;
    for(const album of albums) {
        const genres = await getArtistGenre(album);
        const newAlbum = await saveAlbum(album, genres);
        for(const genre of genres) {
            await saveGenre(genre, newAlbum._id)
        }   
    }
    
    OFF_SET_ALBUMS += LIMIT_ALBUMS;
    return res.status(200).send({message:"Albums filled with success"});
    // .then(data => {        
    //     let count = 0;
    //     data.body.items.map(item => {            
    //         getArtistGenre(item).then(genres => {
    //             let newAlbum = new Album(item);
    //             newAlbum.album.genres = genres;

    //             saveAlbum(newAlbum);
    //             saveGenre(genres, newAlbum._id);
    //         })
    //     });      
        
    //     //offset albums searched based on search limit
    //     OFF_SET_ALBUMS += LIMIT_ALBUMS;
    //     return res.status(200).send({message:"Albums filled with success"});
    // })
    // .catch(err => console.log('Something went wrong Get Albums!', err));
}


async function saveAlbum(album, genres) {
    let newAlbum = new Album(album);
    newAlbum.album.genres = genres;
    
    // save album
    const albumName = newAlbum.album.name;
    return await Album.find({"album.name": albumName}, (err, us) => {}).then(element => {
        // album doesn't exist on db
        if(element.length == 0) {
            newAlbum.save();
            return newAlbum;
        }                        
    })

}

async function saveGenre(genre, newAlbumID) {
    //save genre
    
    return await Genre.find({genre}, (err, results) => {
        if(results.length > 0) {
            results[0].albumsID.push(newAlbumID);
            results[0].save();
            return results[0];
        } else {
            let newGenre = new Genre({genre, albumsID: newAlbumID});
            newGenre.save();
            return newGenre;
        }
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
