import React, { useRef, useEffect, useContext } from 'react';
import { Context } from '../context/Provider';
import { formatTime, setAudioSrc, playAudio, pauseAudio } from './audioHelpers';

// click handler for audio playback/pause, used by PlayPauseBtn, SingleSong
export const handlePlayerBtnClick = (audioRef, newSrc) => {
	if (!audioRef.current.src || audioRef.current.src !== newSrc) {
		setAudioSrc(audioRef, newSrc);
	}
	audioRef.current.paused ? playAudio(audioRef) : pauseAudio(audioRef);
};

const Audio = () => {
	const { state, fetchSetAudioRef, fetchUpdateTrackTime } = useContext(Context);

	const audioRef = useRef(null);

	useEffect(() => {
		fetchSetAudioRef(audioRef);
	}, []);

	console.log(state);

	const handleTimeUpdate = () => {
		const currentPosition = formatTime(
			Math.floor(audioRef.current.currentTime)
		);
		const totalTime = formatTime(Math.floor(audioRef.current.duration));

		// if-check guards against NaN:NaN totalTime before song has loaded
		if (!isNaN(audioRef.current.duration)) {
			fetchUpdateTrackTime(`${currentPosition} / ${totalTime}`);
		}
	};

	// bind onTimeUpdate event listener that will provide
	// current place and total time, ex. 1:45 / 3:30
	return <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />;
};

export default Audio;
