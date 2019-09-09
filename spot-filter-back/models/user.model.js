var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    display_name: {
        type: String
    },
    genresID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }]
});

var User = mongoose.model('user', userSchema);
module.exports = User;