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


const USER_TOKEN = 'BQCEsos-B50nMhkk3lpTpHQk1kJCAxLHTfwKnPD_Qoh989BEHIsAcN-QxCpyANVf_M31-r8c4oOQrROdlaZMVTS8V54526rY3BIFerEjxjQPtr-En8k-GH9JkEG9b5BtUAK1pdRAXZ9g-TuiQtyAMVjUgKol5wYQ5ufSr2BgsB94xA';
spotifyApi.setAccessToken(USER_TOKEN);


var albums = [];

exports.getAlbumsGenre = async function(req, res) {
    Album.find({}, (err, albums) => {})
    .then(res => {
        // console.log(res);
        count = 0
        res.map(item => {
            
            console.log(item.album.name);
            
        });
        

        // let genres = res.map(item => item.album.genres)
        // let genreAlbum = new GenreAlbum({genres: genres, albumID: res.id});
    }).catch(err => console.log('Something went wrong Genre!', err));

    console.log(Album.albumID);
    
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

        return res.end();
    })
    // .then(result => {        
    //     setTimeout(() => {
    //         saveAlbum(albums, req, res);
    //     }, 500);
    // })
    .catch(err => console.log('Something went wrong Get Albums!', err));

}

// async function saveAlbum(albums, req, res) {    
    
//     albums.map(album => {        
//         album.save((err, us) => {
//             if (!err) {
//                 // return res.status(400).json({message: 'Something went wrong', status:400});
//                 return res.status(200).json({message: "Albums' set", status: 201, data: albums});
//             }
//         });
//     })
// }


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
