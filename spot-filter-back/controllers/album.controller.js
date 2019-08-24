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


const USER_TOKEN = 'BQAo1GXZPETDzwTetZXpFqtzyXHpca_ADOoHVSYr9g5EbyEft6xy2d4TNGSjr-sfUDLay66PEoAmflVbw5q8lOEuiGB1Ts9Y5GTzAM89b6z8fOwxUHfEpSH2KIsMuscT6bbabWyKYqvy_NHhXTRCFCjF46L1z8_eLs0uNsrzJI_mDg';
spotifyApi.setAccessToken(USER_TOKEN);

var LIMIT_ALBUMS = 2;
var OFF_SET_ALBUMS = 0;

exports.getAlbumsByGenre = async function(req, res) {    
    GenreAlbum.find({}, (err, albums) => {})
        .then(result => {
            const genre = req.query.genre;
            let albumsByGenre = [];
            result.map(item => {
                if(item.genres.includes(genre)) {
                    
                    findAlbum(item.albumID)
                        .then(element => albumsByGenre.push(element))
                }                
            });
            
            setTimeout(() => {
                return res.json({albumsByGenre});
            }, 200);
        })
        .catch(err => console.log('Something went wrong with Albums', err));
}

async function findAlbum(albumID) {
    return Album.findById(albumID, (err, album) =>{
        if(album != null) {            
            return album;
        } else {
            return null;
        }
    });
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
                    
                    const albumName = newAlbum.album.name
                    Album.find({"album.name": albumName}, (err, us) => {}).then(element => {
                        if(element.length == 0) {
                            newAlbum.save()
                        }                        
                    })


                    genres.map(genre => {
                        Genre.find({genre}, (err, us) => {}).then(element => {
                            if(element.length == 0) {
                                let newGenre = new Genre({genre})
                                newGenre.save();
                            }
                        })
                    })
                })
            }
        });      
        
        OFF_SET_ALBUMS += LIMIT_ALBUMS;
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
