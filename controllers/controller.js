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


var scopes = ['user-library-read']

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI + 'callback'
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
            newUser = new User();
            newUser._id = id;
            newUser.display_name = displayName;
            newUser.save();
        }
    })
    
    res.redirect(process.env.FRONT_REDIRECT + id);
  })
}

exports.getDisplayName = async function(req, res) {
    const userID = req.query.id;

    if(userID.length > 0) {
        User.find({_id: userID}, (err, user) => {
            if(user.length > 0) {
                const displayName = user[0].display_name;
                
                res.json({displayName})
            }
        })
    }

}

exports.logout = async function(req, res) {
    // mongoose.connection.db.dropDatabase();
    // newUser = new User();
}

exports.fillByGenre = async function(req, res) {    
    const response = await spotifyApi.getMySavedAlbums({
        limit: LIMIT_ALBUMS,
        offset: OFF_SET_ALBUMS
    })

    const userID = req.query.id;
    const albums = await response.body.items;
    
    for(const album of albums) {
        const newArtist = await getArtist(album, userID);
        if(newArtist) {
            const genres = newArtist.genres;
            const newAlbum = await saveAlbum(album, genres, userID);
            for(const genre of genres) {
                await saveGenre(genre, newAlbum._id, newArtist._id, userID)
            }   
        }
    }
    
    OFF_SET_ALBUMS += LIMIT_ALBUMS;
    return res.status(200).send({message:"Albums filled with success"});
}


async function saveAlbum(album, genres, userID) {
    let newAlbum = new Album(album);
    newAlbum.album.genres = genres;
    
    // save album
    const albumName = newAlbum.album.name;
    return await Album.find({"album.name": albumName}, (err, us) => {}).then(element => {
        // album doesn't exist on db
        if(element.length == 0) {
            newAlbum.save();
            const albumID = newAlbum._id;
            User.findOneAndUpdate({_id: userID}, {$addToSet: {albumsID: albumID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
            return newAlbum;
        } else {
            const albumID = element[0]._id;
            User.findOneAndUpdate({_id: userID}, {$addToSet: {albumsID: albumID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
        }
    })

}

async function saveGenre(genre, newAlbumID, newArtistID, userID) {
    //save genre
    
    return await Genre.find({genre}, (err, results) => {
        if(results.length > 0) {
            results[0].albumsID.push(newAlbumID);
            results[0].artistsID.push(newArtistID);
            results[0].save();
            const genreID = results[0]._id;
            User.findOneAndUpdate({_id: userID}, {$addToSet: {genresID: genreID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
        } else {
            let newGenre = new Genre({genre, albumsID: newAlbumID, artistsID: newArtistID});
            newGenre.save();
            const genreID = newGenre._id;
            User.findOneAndUpdate({_id: userID}, {$addToSet: {genresID: genreID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
        }
    })
    
}

function getArtist(item, userID) {
    let artist = item.album.artists;
    artistID = artist[0].id;
    
    return getArtistInfo(artistID, userID).then(res => res).catch(err => console.log(err));
}

async function getArtistInfo(artistID, userID) {
    return await spotifyApi.getArtist(artistID).then(data => {
        const artist = data.body;    
        let newArtist = new Artist(artist);    

        return saveArtist(newArtist, userID).then(res => res).catch(err => console.log(err));
    }).catch(err => console.log(err)); 
}


async function saveArtist(newArtist, userID) {
    return await Artist.find({name: newArtist.name}, (err, us) => {}).then(element => {
        // artist doesn't exist on db
        if(element.length == 0) {
            newArtist.save();
            const artistID = newArtist._id;
            User.findOneAndUpdate({_id: userID}, {$addToSet: {artistsID: artistID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
            return newArtist;
        } else {
            const artistID = element[0]._id;
            User.findOneAndUpdate({_id: userID}, {$addToSet: {artistsID: artistID}}, {$upsert: true, new: true, runValidators: true})
                .catch(err => console.log(err));
        }
    })
}