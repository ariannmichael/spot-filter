const mongoose = require('mongoose');
var _ = require('lodash');
var Genre = require('../models/genre.model');
var User = require('../models/user.model');

exports.getGenres = async function(req, res) {
    const userID = req.query.id;
    
    User.find({_id: userID}, (err, user) => {       
        let genresID = user[0].genresID;

        Genre.find({_id: {$in: genresID}}, (err, us) => {})
            .then(genres => res.json({genres}))
            .catch(err => console.log('Something went wrong with Genres',err));
    });
}

exports.getGenreID = async function(req, res) {
    const genreName = req.query.genre;
    const userID = req.query.id;
    
    User.find({_id: userID}, (err, user) => {       
        let genresID = user[0].genresID;
        
        Genre.find({_id: {$in: genresID}, genre: {$regex: genreName}}, (err, us) => {})
            .then(genres => {
                res.json({genres})
            })
            .catch(err => console.log('Something went wrong with Genres',err));
    });
}