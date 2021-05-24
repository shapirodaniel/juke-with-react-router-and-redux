import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { setPaused } from '../redux/audio';
import { handlePlayerBtnClick } from './Audio';

const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';

const PlayPauseBtn = ({ song }) => {
	const currentSong = useSelector(state => state.currentSong);
	const isPaused = useSelector(state => state.audio.isPaused);

	const dispatch = useDispatch();
	const updateCurrentSong = thisSong => dispatch(setCurrentSong(thisSong));
	const updatePaused = status => dispatch(setPaused(status));

	const handleClick = () => {
		updateCurrentSong(song);
		const status = handlePlayerBtnClick(song.audioUrl);
		updatePaused(status);
	};

	return (
		<i
			className={song.id === currentSong.id && !isPaused ? pauseIcon : playIcon}
			onClick={handleClick}
		/>
	);
};

export default PlayPauseBtn;
