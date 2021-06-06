import React, { useReducer } from 'react';
import axios from 'axios';

// create our context
export const Context = React.createContext();

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
const reducer = (state, { type, payload }) => {
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
const initState = {
	albums: [],
	currentAlbum: {},
	currentSong: {},
	audio: {
		audioRef: null,
		trackTime: '',
		isPaused: true,
	},
};

const Provider = ({ children }) => {
	// useReducer takes a reducer and an initial state and returns state + a dispatch method to send action creators through the reducer fn
	const [state, dispatch] = useReducer(reducer, initState);

	// wrap action creators in dispatch method before making available on Context
	// important! rename wrapped fns to avoid namespace collisions
	const loadAlbums = albums => dispatch(getAlbums(albums));
	const loadCurrentAlbum = album => dispatch(setCurrentAlbum(album));
	const fetchSetAudioRef = audioRef => dispatch(setAudioRef(audioRef));
	const fetchUpdateTrackTime = time => dispatch(updateTrackTime(time));
	const fetchSetPaused = status => dispatch(setPaused(status));
	const fetchSetCurrentSong = song => dispatch(setCurrentSong(song));

	// create thunks for async network calls
	// note: we've * already * wrapped our action creators in dispatch, so we won't need to curry these fns
	const fetchAlbums = async () => {
		try {
			const { data: albums } = await axios.get('/api/albums');
			loadAlbums(albums);
		} catch (err) {
			console.error(err);
		}
	};
	const fetchCurrentAlbum = async albumId => {
		try {
			const { data: album } = await axios.get(`/api/albums/${albumId}`);
			loadCurrentAlbum(album);
		} catch (err) {
			console.error(err);
		}
	};

	// set provider value
	const providerValue = {
		state,
		fetchAlbums,
		fetchCurrentAlbum,
		fetchSetAudioRef,
		fetchUpdateTrackTime,
		fetchSetPaused,
		fetchSetCurrentSong,
	};

	// use the in-built Provider component on Context to wrap its subtree and make the providerValue object available to all downstream components -- here we use the "children" prop to render the wrapped subtree
	return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};

export default Provider;
