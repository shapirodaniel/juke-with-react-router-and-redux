const SET_AUDIO_STATUS = 'SET_AUDIO_STATUS';

// audio status
// if null, not playing
// otherwise: PLAYING | PAUSED | STOPPED
const PLAYING = 'PLAYING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';

export const audioStatuses = {
	PLAYING,
	PAUSED,
	STOPPED,
};

export const setAudioStatus = status => ({
	type: SET_AUDIO_STATUS,
	payload: status,
});

const initState = STOPPED;

export default (state = initState, { type, payload }) => {
	switch (type) {
		case SET_AUDIO_STATUS:
			return payload;
		default:
			return state;
	}
};
