import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTrackTime, setAudioRef } from '../redux/audio';

const formatTime = timeInSeconds => {
	// if-check returns formatted time under 60 seconds
	if (timeInSeconds < 60)
		return `0:${timeInSeconds < 10 ? `0${timeInSeconds}` : timeInSeconds}`;

	// else we calculate minutes:seconds
	const minutes = Math.floor(timeInSeconds / 60);
	const remainingSeconds = Math.floor(timeInSeconds - minutes * 60);

	return `${minutes}:${
		remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
	}`;
};

// helpers
const setAudioSrc = (src, audioRef) => {
	if (src) audioRef.current.src = src;
};

// important! audioRef.play() returns a Promise
// so we async/await it here to avoid an uncaught DOM exception error
// that results from trying to play a source that hasn't loaded yet
const playAudio = async audioRef => {
	if (audioRef.current.src) await audioRef.current.play();
};

const pauseAudio = audioRef => {
	if (audioRef.current.src) audioRef.current.pause();
};

// click handler for audio playback/pause
export const handlePlayerBtnClick = (newSrc, audioRef) => {
	if (!audioRef.current.src || audioRef.current.src !== newSrc) {
		setAudioSrc(newSrc);
	}
	audioRef.current.paused ? playAudio() : pauseAudio();
};

const Audio = () => {
	const audioRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setAudioRef(audioRef));
	}, [audioRef.current]);

	const handleTimeUpdate = () => {
		const currentPosition = formatTime(
			Math.floor(audioRef.current.currentTime)
		);
		const totalTime = formatTime(Math.floor(audioRef.current.duration));

		// if-check guards against NaN:NaN totalTime before song has loaded
		if (!isNaN(audioRef.current.duration)) {
			dispatch(updateTrackTime(`${currentPosition} / ${totalTime}`));
		}
	};

	// bind onTimeUpdate event listener that will provide
	// current place and total time, ex. 1:45 / 3:30
	return <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />;
};

export default Audio;
