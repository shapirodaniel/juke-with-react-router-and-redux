import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { handlePlayerBtnClick } from './Audio';

const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';

const PlayPauseBtn = ({ song }) => {
	const audioRef = useSelector(state => state.audio.audioRef);
	const currentSong = useSelector(state => state.currentSong);
	const isPaused = useSelector(state =>
		state.audio.audioRef ? state.audio.audioRef.paused : true
	);

	const dispatch = useDispatch();
	const updateCurrentSong = thisSong => dispatch(setCurrentSong(thisSong));

	const handleClick = () => {
		updateCurrentSong(song);
		handlePlayerBtnClick(audioRef, song.audioUrl);
	};

	return (
		<i
			className={song.id === currentSong.id && !isPaused ? pauseIcon : playIcon}
			onClick={handleClick}
		/>
	);
};

export default PlayPauseBtn;
