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


const USER_TOKEN = 'BQAhdO6eyLOyrkMJwUPoIqPH0pxQR5nHB7T1TbPWcual7VqvX3gdDFKy1dvJqwFfQp7nZtWMSwNgRjFBO0ZE7rgHc1MC04uGrTX--11lQdQZ4p_V2Wa6SJhxRmCjZ1xa8Gdcukd0kNskgs5c96Y_q247orAZ81-olkUOuhmKNs_psg';
spotifyApi.setAccessToken(USER_TOKEN);


exports.getAlbumsGenre = async function(req, res) {
    Album.find({}, (err, albums) => {})
    .then(res => {
        // console.log(res);
        
        // let genres = res.map(item => item.album.genres)
        // let genreAlbum = new GenreAlbum({genres: genres, albumID: res.id});
    }).catch(err => console.log('Something went wrong Genre!', err));

    console.log(Album.albumID);
    
}

exports.fillAlbumsByGenre = async function(req, res) {
    spotifyApi.getMySavedAlbums({
        limit: 5,
        offset:0
    })
    .then(data => {
        data.body.items.map(item => { 
            if(item.genres != null) {                
                let albums = new Album(item);

                save(albums, req, res);
            } else {
                getArtistGenre(item).then(genres => {
                    let newAlbum = new Album(item);
                    newAlbum.album.genres = genres;
                    
                    save(newAlbum, req, res);    
                });
            }
        });        
    })
    .catch(err => console.log('Something went wrong Get Albums!', err));
}

async function save(albums, req, res) {
    albums.save((err, us) => {
        if (err) {
            return res.status(400).json({message: 'Something went wrong', status:400});
        } else {
            console.log('Albums fill');
            return res.status(200).json({message: "Albums' set", status: 201, data: albums});
        }
    });
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
