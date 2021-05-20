const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export const setCurrentSong = song => ({
	type: SET_CURRENT_SONG,
	payload: song,
});

const initState = {};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case SET_CURRENT_SONG:
			return payload;
		default:
			return state;
	}
};
