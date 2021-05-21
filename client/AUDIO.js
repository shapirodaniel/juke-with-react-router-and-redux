// audio element
export const AUDIO = document.createElement('audio');

const formatTime = timeInSeconds => {
	if (timeInSeconds < 60)
		return `0:${timeInSeconds < 10 ? `0${timeInSeconds}` : timeInSeconds}`;

	const minutes = Math.floor(timeInSeconds / 60);
	const remainingSeconds = Math.floor(timeInSeconds - minutes * 60);

	return `${minutes}:${
		remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
	}`;
};

// bind onTimeUpdate event listener that will provide
// current place and total time, ex. 1:45 / 3:30
AUDIO.ontimeupdate = function () {
	const currentPosition = formatTime(Math.floor(this.currentTime));
	const totalTime = formatTime(Math.floor(this.duration));

	console.log(currentPosition, totalTime);

	// if-check guards against NaN before track has loaded
	if (!isNaN(totalTime))
		document.getElementById(
			'track-time'
		).innerText = `${currentPosition} / ${totalTime}`;
};

// helpers
const setAudioSrc = src => {
	if (src) AUDIO.src = src;
};

// important! AUDIO.play() returns a Promise
// so we async/await it here to avoid an uncaught DOM exception error
// that results from trying to play a source that hasn't loaded yet
const playAudio = async () => {
	if (AUDIO.src) await AUDIO.play();
};

const pauseAudio = () => {
	if (AUDIO.src) AUDIO.pause();
};

// click handler for audio playback/pause
export const handlePlayerBtnClick = newSrc => {
	if (!AUDIO.src || AUDIO.src !== newSrc) {
		setAudioSrc(newSrc);
	}
	AUDIO.paused ? playAudio() : pauseAudio();
	return AUDIO.paused;
};
