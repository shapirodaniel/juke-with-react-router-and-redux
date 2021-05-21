// audio element
export const AUDIO = document.createElement('audio');

// helpers
const setAudioSrc = src => {
	if (src) AUDIO.src = src;
};

// important!
// AUDIO.play() returns a Promise
// so we async/await it here to avoid
// uncaught DOM exception interrupted playback by load cmd
const playAudio = async () => {
	if (AUDIO.src) await AUDIO.play();
};

const pauseAudio = () => {
	if (AUDIO.src) AUDIO.pause();
};

// click handler for audio playback/pause
export const handlePlayerBtnClick = newSrc => {
	// if audio doesn't have an src yet
	// or the current src doesn't equal the one passed
	// set it
	if (!AUDIO.src || AUDIO.src !== newSrc) {
		setAudioSrc(newSrc);
	}

	// check if playing on audio element "paused" attr
	if (!AUDIO.paused) {
		pauseAudio();
	} else {
		playAudio();
	}

	return AUDIO.paused;
};
