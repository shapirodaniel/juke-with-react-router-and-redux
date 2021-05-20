import axios from 'axios';

const GET_ALBUMS = 'GET_ALBUMS';

const getAlbums = albums => ({
	type: GET_ALBUMS,
	payload: albums,
});

export const fetchAlbums = () => async dispatch => {
	try {
		const { data: albums } = await axios.get('/api/albums');
		dispatch(getAlbums(albums));
	} catch (err) {
		console.error(err);
	}
};

const initState = [];

export default (state = initState, { type, payload }) => {
	switch (type) {
		case GET_ALBUMS:
			return payload;
		default:
			return state;
	}
};
