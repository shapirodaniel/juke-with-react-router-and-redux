export const AUDIO = document.createElement('audio');

export const setAudioSrc = src => {
	if (src) AUDIO.src = src;
};

export const playAudio = async () => {
	if (AUDIO.src) await AUDIO.play();
};

export const pauseAudio = () => {
	if (AUDIO.src) AUDIO.pause();
};
