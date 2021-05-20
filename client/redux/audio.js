const PLAY_AUDIO = 'PLAY_AUDIO';
const PAUSE_AUDIO = 'PAUSE_AUDIO';
const SET_AUDIO_SRC = 'SET_AUDIO_SRC';

// grab audioElement imperatively
const audioElement = document.getElementById('audioElement');

// statuses obj
export const audioStatuses = {
	PLAYING: 'PLAYING',
	PAUSED: 'PAUSED',
	STOPPED: 'STOPPED',
};

export const playAudio = () => ({
	type: PLAY_AUDIO,
	payload: audioStatuses.PLAYING,
});

export const pauseAudio = () => ({
	type: PAUSE_AUDIO,
	payload: audioStatuses.PAUSED,
});

export const setAudioSrc = src => ({
	type: SET_AUDIO_SRC,
	payload: src,
});

// initState is audioSrc: string
const initState = {
	status: audioStatuses.STOPPED,
	src: '',
};

// if-checks guard against audioElement not having been
// mounted yet when reducer first runs
export default (state = initState, { type, payload }) => {
	switch (type) {
		case PLAY_AUDIO: {
			if (audioElement) audioElement.play();
			return { ...state, status: payload };
		}
		case PAUSE_AUDIO: {
			if (audioElement) audioElement.pause();
			return { ...state, status: payload };
		}
		case SET_AUDIO_SRC: {
			if (audioElement) audioElement.src = payload;
			return { ...state, src: payload };
		}
		default: {
			return state;
		}
	}
};
