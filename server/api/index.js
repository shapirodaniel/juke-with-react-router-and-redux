const router = require('express').Router();
const { Album, Artist, Song } = require('../db');

// connect your API routes here!
router.get('/albums', async (req, res, next) => {
  try {
    const albumsAndArtists = await Album.findAll({
      include: Artist,
    });
    res.json(albumsAndArtists);
  } catch (error) {
    next(error);
  }
});

router.get('/albums/:albumId', async (req, res, next) => {
  try {
    const albumSongs = await Album.findOne({
      include: [{ model: Artist }, { model: Song }],
      where: {
        id: req.params.albumId,
      },
    });
    res.json(albumSongs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
