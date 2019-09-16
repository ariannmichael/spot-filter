const mongoose = require('mongoose');
var _ = require('lodash');
var Genre = require('../models/genre.model');
var Album = require('../models/album.model');
var User = require('../models/user.model');


exports.getAlbumsByGenre = async function(req, res) {
    const genreID = req.query.genre_id;
    const userID = req.query.id;

    let genre = await Genre.find({_id: genreID}, (err, genre) => {})
    let genreAlbumsID = genre[0].albumsID;
    

    let user =  await User.find({_id: userID}, (err, user) => {});
    let userAlbumsID = user[0].albumsID;

    let albumsID = genreAlbumsID.filter(id => userAlbumsID.includes(id));
    
    Album.find({_id: {$in: albumsID}}, (err, albums) => {
        res.json(albums);            
    }).catch(err => console.log(err));
}