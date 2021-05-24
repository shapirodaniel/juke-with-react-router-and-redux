import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { setPaused } from '../redux/audio';
import { handlePlayerBtnClick } from './Audio';
import PlayPauseBtn from './PlayPauseBtn';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';

// functions for song navigation
const setPreviousSong = (currentAlbum, currentSong, dispatch) => {
	// early return if currentAlbum undefined
	// user has refreshed or navigated directly to all albums view
	if (!currentAlbum.songs) return;

	let previousIndex =
		currentAlbum.songs.findIndex(song => song.id === currentSong.id) - 1;

	if (previousIndex < 0) {
		previousIndex = currentAlbum.songs.length - 1;
	}

	const previousSong = currentAlbum.songs[previousIndex];

	dispatch(setCurrentSong(previousSong));
	const status = handlePlayerBtnClick(previousSong.audioUrl);
	dispatch(setPaused(status));
};

const setNextSong = (currentAlbum, currentSong, dispatch) => {
	// see setPreviousSong
	if (!currentAlbum.songs) return;

	let nextIndex =
		currentAlbum.songs.findIndex(song => song.id === currentSong.id) + 1;

	if (nextIndex === currentAlbum.songs.length) {
		nextIndex = 0;
	}

	const nextSong = currentAlbum.songs[nextIndex];

	dispatch(setCurrentSong(nextSong));
	const status = handlePlayerBtnClick(nextSong.audioUrl);
	dispatch(setPaused(status));
};

const Player = () => {
	const trackTime = useSelector(state => state.audio.trackTime);
	const currentAlbum = useSelector(state => state.currentAlbum),
	const currentSong = useSelector(state => state.currentSong),
	const dispatch = useDispatch();

	return (
		<div id='player-container'>
			<div id='player-controls'>
				<div id='current-album'>
					<img src={currentAlbum.artworkUrl} />
					<span>
						{currentAlbum.name}
						{currentAlbum.name && ' | '}
						{currentAlbum.artist && currentAlbum.artist.name}
					</span>
				</div>
				<div className='row center'>
					<i
						className={backIcon}
						onClick={() => {
							setPreviousSong(currentAlbum, currentSong, dispatch);
						}}
					/>
					{/* play/pause btn requires a song prop, which is used to conditionally render the btn icon -- by passing currentSong here, we are asserting that this play/pause btn will always be the active one for any play/pause action */}
					<PlayPauseBtn song={currentSong} />
					<i
						className={forwardIcon}
						onClick={() => setNextSong(currentAlbum, currentSong, dispatch)}
					/>
				</div>
				{/* audioRef's onTimeUpdate event handler makes trackTime available on the redux store's audio object */}
				<div id='track-name-and-time'>
					<span id='track-name'>{currentSong.name}</span>
					<span id='track-time'>{trackTime}</span>
				</div>
			</div>
		</div>
	);
};

export default Player
