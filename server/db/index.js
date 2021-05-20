const db = require('./db');
<<<<<<< HEAD
const Album = require('./album');
const Artist = require('./artist');
const Song = require('./song');

Song.belongsTo(Album);
Album.hasMany(Song);

Song.belongsTo(Artist);
Artist.hasMany(Song);
=======
// require each of your models here...
const Album = require('./Album');
const Artist = require('./Artist');
const Song = require('./Song');

// ...and give them some nice associations here!
Album.hasMany(Song);
Song.belongsTo(Album);

Artist.hasMany(Song);
Song.belongsTo(Artist);
>>>>>>> ea9b6a57f4a73ed972d96ffe25e19af14eab7897

Album.belongsTo(Artist);
Artist.hasMany(Album);

module.exports = {
<<<<<<< HEAD
	db,
	Album,
	Artist,
	Song,
=======
  db,
  Album,
  Artist,
  Song,
  // Include your models in your module.exports as well!
  // The seed file expects to find them there!
>>>>>>> ea9b6a57f4a73ed972d96ffe25e19af14eab7897
};
