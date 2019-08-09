const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


mongoose.connect('mongodb://localhost:27017/spotfilter', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

mongoose.connection.once('open', () => {
    console.log('Connected to database.');
}).on('error', err => {
    console.log('Error connecting to database', err);
});

module.exports = {
    Album: require('./models/album.model')
}