import React, { useReducer } from 'react';
import axios from 'axios';

// import our reducer logic
import {
	getAlbums,
	setAudioRef,
	updateTrackTime,
	setPaused,
	setCurrentAlbum,
	setCurrentSong,
	reducer,
	initState,
} from './reducer';

// create our context
export const Context = React.createContext();

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
