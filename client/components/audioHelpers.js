export const formatTime = timeInSeconds => {
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

export const setAudioSrc = (audioRef, src) => {
	if (src) audioRef.current.src = src;
};

// important! audioRef.play() returns a Promise
// so we async/await it here to avoid an uncaught DOM exception error
// that results from trying to play a source that hasn't loaded yet
export const playAudio = async audioRef => {
	if (audioRef.current.src) await audioRef.current.play();
};

export const pauseAudio = audioRef => {
	if (audioRef.current.src) audioRef.current.pause();
};
