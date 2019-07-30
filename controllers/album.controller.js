const mongoose = require('mongoose');
var _ = require('lodash');
var axios = require('axios');


const USER_TOKEN = 'BQB5X3oBTermhTQAWFzjzENSfaqcv-kRCAgNPRanOXNyicaOyOniLwNktY80wTXETVcjEyiukyGPitmw8p8tfW5RhoP-PJc_8hLTo7zqzJqy9ZWwOM1Jh61gtmUwjSgbBnqWxfu2pYhnWHHhUkzcp4YnW0VJjnxzKw3gsKMNILXwsw';
var albums = [];

exports.getAlbums = async function(req, res) {
    const AuthStr = 'Bearer '.concat(USER_TOKEN)
    axios.get('https://api.spotify.com/v1/me/albums', {
        headers: {
            Authorization: AuthStr
        }
    })
    .then(res => res.data)
    .then(data => {
        console.log(data.items);
        
    });
} 