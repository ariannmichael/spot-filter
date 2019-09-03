const mongoose = require('mongoose');
var _ = require('lodash');
var Genre = require('../models/genre.model');
var Artist = require('../models/artist.model');


exports.getArtistsByGenre = async function(req, res) {
    const genreID = req.query.id;    

    Genre.find({_id: genreID}, (err, genre) => {        
        let artistsID = genre[0].artistsID        

        Artist.find({_id: {$in: artistsID}}, (err, albums) => {
            res.json(albums);            
        });
    })
}