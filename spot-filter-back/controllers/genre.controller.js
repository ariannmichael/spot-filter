const mongoose = require('mongoose');
var _ = require('lodash');
var Genre = require('../models/genre.model');

exports.getGenres = async function(req, res) {
    Genre.find({genre: "axe"}, (err, us) => {})
        .then(genres => res.json({genres}))
        .catch(err => console.log('Something went wrong with Genres',err));
}

exports.getGenreID = async function(req, res) {
    const genreName = req.query.genre;
    
    Genre.find({genre: {$regex: genreName }}, (err, result) => {
        res.json(result);            
    })

}