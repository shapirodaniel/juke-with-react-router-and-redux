// define our action types
const GET_ALBUMS = 'GET_ALBUMS';
const SET_AUDIO_REF = 'SET_AUDIO_REF';
const UPDATE_TRACK_TIME = 'UPDATE_TRACK_TIME';
const SET_PAUSED = 'SET_PAUSED';
const SET_CURRENT_ALBUM = 'SET_CURRENT_ALBUM';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

// define our action creators
export const getAlbums = albums => ({
	type: GET_ALBUMS,
	payload: albums,
});
export const setAudioRef = audioRef => ({
	type: SET_AUDIO_REF,
	payload: audioRef,
});
export const updateTrackTime = trackTime => ({
	type: UPDATE_TRACK_TIME,
	payload: trackTime,
});
export const setPaused = isPaused => ({
	type: SET_PAUSED,
	payload: isPaused,
});
export const setCurrentAlbum = album => ({
	type: SET_CURRENT_ALBUM,
	payload: album,
});
export const setCurrentSong = song => ({
	type: SET_CURRENT_SONG,
	payload: song,
});

// build our reducer
// note: useReducer does * not * initialize state as a default parameter of the reducer fn
// rather, initial state is supplied as the second argument to useReducer
export const reducer = (state, { type, payload }) => {
	switch (type) {
		case GET_ALBUMS:
			return { ...state, albums: payload };
		case SET_AUDIO_REF:
			return { ...state, audio: { ...state.audio, audioRef: payload } };
		case UPDATE_TRACK_TIME:
			return { ...state, audio: { ...state.audio, trackTime: payload } };
		case SET_PAUSED:
			return { ...state, audio: { ...state.audio, isPaused: payload } };
		case SET_CURRENT_ALBUM:
			return { ...state, currentAlbum: payload };
		case SET_CURRENT_SONG:
			return { ...state, currentSong: payload };
		default:
			return state;
	}
};

// build our initial state
export const initState = {
	albums: [],
	currentAlbum: {},
	currentSong: {},
	audio: {
		audioRef: null,
		trackTime: '',
		isPaused: true,
	},
};
