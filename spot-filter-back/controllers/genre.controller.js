const mongoose = require('mongoose');
var _ = require('lodash');
var Genre = require('../models/genre.model');

exports.getGenres = async function(req, res) {
    Genre.find({}, (err, us) => {})
        .then(genres => res.json({genres}))
        .catch(err => console.log('Something went wrong with Genres',err));
}

exports.getGenreID = async function(req, res) {
    const genre = req.query.genre;
    
    Genre.find({genre}, (err, result) => {
        res.json(result);        
    })

}