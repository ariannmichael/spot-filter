const mongoose = require('mongoose');
var _ = require('lodash');
var Genre = require('../models/genre.model');
var Album = require('../models/album.model');


exports.getAlbumsByGenre = async function(req, res) {
    const genreID = req.query.id;    

    Genre.find({_id: genreID}, (err, genre) => {        
        let albumsID = genre[0].albumsID        

        Album.find({_id: {$in: albumsID}}, (err, albums) => {
            res.json(albums);            
        });
    })
}