import axios from 'axios';

const SET_CURRENT_ALBUM = 'SET_CURRENT_ALBUM';

const setCurrentAlbum = album => ({
	type: SET_CURRENT_ALBUM,
	payload: album,
});

export const fetchCurrentAlbum = albumId => async dispatch => {
	try {
		const { data: album } = await axios.get(`/api/albums/${albumId}`);
		dispatch(setCurrentAlbum(album));
	} catch (err) {
		console.error(err);
	}
};

const initState = {};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case SET_CURRENT_ALBUM:
			return payload;
		default:
			return state;
	}
};
