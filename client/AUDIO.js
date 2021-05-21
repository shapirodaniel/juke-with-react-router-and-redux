// audio element
export const AUDIO = document.createElement('audio');

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
