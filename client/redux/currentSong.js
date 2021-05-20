const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

const setCurrentSong = song => ({
	type: SET_CURRENT_SONG,
	payload: song,
});

export const fetchSetCurrentSong = songId => async dispatch => {
	try {
		const { data: song } = await axios.get(`/api/songs/${songId}`);
		setCurrentSong(song);
	} catch (err) {
		console.error(err);
	}
};

const initState = {};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case SET_CURRENT_SONG:
			return payload;
		default:
			return state;
	}
};
