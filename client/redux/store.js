import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// sub-reducers
import {
	albumsReducer,
	currentSongReducer,
	audioStatusReducer,
	currentAlbumReducer,
} from './';

const rootReducer = combineReducers({
	albums: albumsReducer,
	currentSong: currentSongReducer,
	audioStatus: audioStatusReducer,
	currentAlbum: currentAlbumReducer,
});

export default createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);
