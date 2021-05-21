import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// sub-reducers
import {
	albumsReducer,
	currentSongReducer,
	currentAlbumReducer,
	playBtnStatusReducer,
} from './';

const rootReducer = combineReducers({
	albums: albumsReducer,
	currentSong: currentSongReducer,
	currentAlbum: currentAlbumReducer,
});

export default createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);
