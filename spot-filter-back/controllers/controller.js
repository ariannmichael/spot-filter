const mongoose = require('mongoose');
var _ = require('lodash');
var Album = require('../models/album.model');
var Artist = require('../models/artist.model');
var Genre = require('../models/genre.model');
var User = require('../models/user.model');
var SpotifyWebApi = require('spotify-web-api-node');
Genre.createCollection();

var LIMIT_ALBUMS = 2;
var OFF_SET_ALBUMS = 0;

var displayName = '';
var id = '';
let newUser = new User();

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
    id = data.body['id'];
    displayName = data.body['display_name'];

    User.find({_id: id}, (err, result) => {
        if(result.length === 0) {
            newUser._id = id;
            newUser.display_name = displayName;
            newUser.save();
        }
    })
    
    res.redirect('http://localhost:3000/home');
  })
}

exports.getDisplayName = async function(req, res) {
    res.json({displayName, id});
}

exports.logout = async function(req, res) {
    // mongoose.connection.db.dropDatabase();
}

exports.fillByGenre = async function(req, res) {    
    const response = await spotifyApi.getMySavedAlbums({
        limit: LIMIT_ALBUMS,
        offset: OFF_SET_ALBUMS
    })

    const albums = await response.body.items;
    
    for(const album of albums) {
        const newArtist = await getArtist(album);
        if(newArtist) {
            const genres = newArtist.genres;
            const newAlbum = await saveAlbum(album, genres);
            for(const genre of genres) {
                await saveGenre(genre, newAlbum._id, newArtist._id)
            }   
        }
    }
    
    OFF_SET_ALBUMS += LIMIT_ALBUMS;
    return res.status(200).send({message:"Albums filled with success"});
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
            const albumID = newAlbum._id;
            User.findOneAndUpdate({_id: newUser._id}, {$addToSet: {albumsID: albumID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
            return newAlbum;
        } else {
            const albumID = element[0]._id;
            User.findOneAndUpdate({_id: newUser._id}, {$addToSet: {albumsID: albumID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
        }
    })

}

async function saveGenre(genre, newAlbumID, newArtistID) {
    //save genre
    
    return await Genre.find({genre}, (err, results) => {
        if(results.length > 0) {
            results[0].albumsID.push(newAlbumID);
            results[0].artistsID.push(newArtistID);
            results[0].save();
            const genreID = results[0]._id;
            User.findOneAndUpdate({_id: newUser._id}, {$addToSet: {genresID: genreID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
        } else {
            let newGenre = new Genre({genre, albumsID: newAlbumID, artistsID: newArtistID});
            newGenre.save();
            const genreID = newGenre._id;
            User.findOneAndUpdate({_id: newUser._id}, {$addToSet: {genresID: genreID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
        }
    })
    
}

function getArtist(item) {
    let artist = item.album.artists;
    artistID = artist[0].id;
    
    return getArtistInfo(artistID).then(res => res).catch(err => console.log(err));
}

async function getArtistInfo(artistID) {
    return await spotifyApi.getArtist(artistID).then(data => {
        const artist = data.body;    
        let newArtist = new Artist(artist);    

        return saveArtist(newArtist).then(res => res).catch(err => console.log(err));
    }).catch(err => console.log(err)); 
}


async function saveArtist(newArtist) {
    return await Artist.find({name: newArtist.name}, (err, us) => {}).then(element => {
        // artist doesn't exist on db
        if(element.length == 0) {
            newArtist.save();
            const artistID = newArtist._id;
            User.findOneAndUpdate({_id: newUser._id}, {$addToSet: {artistsID: artistID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
            return newArtist;
        } else {
            const artistID = element[0]._id;
            User.findOneAndUpdate({_id: newUser._id}, {$addToSet: {artistsID: artistID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
        }
    })
}