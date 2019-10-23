const mongoose = require('mongoose');
var _ = require('lodash');
var Genre = require('../models/genre.model');
var Artist = require('../models/artist.model');
var User = require('../models/user.model');


exports.getArtistsByGenre = async function(req, res) {
    const genreID = req.query.genre_id;
    const userID = req.query.id;

    let genre = await Genre.find({_id: genreID}, (err, genre) => {})
    if(genre[0]) {
        let genreArtistsID = genre[0].artistsID;

        let user =  await User.find({_id: userID}, (err, user) => {});
        
        if(user[0]) {
            let userArtistsID = user[0].artistsID;
        
            let artistsID = genreArtistsID.filter(id => userArtistsID.includes(id));
            
            Artist.find({_id: {$in: artistsID}}, (err, artists) => {
                res.json(artists);            
            }).catch(err => console.log(err));
        }
    }
    

}