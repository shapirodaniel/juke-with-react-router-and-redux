import React, { useContext } from 'react';
import { Context } from '../context/Provider';
import { handlePlayerBtnClick } from './Audio';

const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';

const PlayPauseBtn = ({ song }) => {
	const { state, fetchSetCurrentSong, fetchSetPaused } = useContext(Context);

	const { audio, currentSong } = state;
	const { audioRef, isPaused } = audio;

	const handleClick = () => {
		fetchSetPaused(song.id === currentSong.id && !isPaused);
		fetchSetCurrentSong(song);
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
