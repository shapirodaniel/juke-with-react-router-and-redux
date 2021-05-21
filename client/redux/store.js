import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// sub-reducers
import {
	albumsReducer,
	currentSongReducer,
	currentAlbumReducer,
	isPausedReducer,
} from './';

const rootReducer = combineReducers({
	albums: albumsReducer,
	currentSong: currentSongReducer,
	currentAlbum: currentAlbumReducer,
	isPaused: isPausedReducer,
});

export default createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);
