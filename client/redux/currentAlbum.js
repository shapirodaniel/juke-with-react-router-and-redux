const SET_CURRENT_ALBUM = 'SET_CURRENT_ALBUM';

export const setCurrentAlbum = album => ({
	type: SET_CURRENT_ALBUM,
	payload: album,
});

const initState = {};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case SET_CURRENT_ALBUM:
			return payload;
		default:
			return state;
	}
};
