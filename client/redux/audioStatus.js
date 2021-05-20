const SET_AUDIO_STATUS = 'SET_AUDIO_STATUS';

// audio status
// if null, not playing
// otherwise: PLAYING | PAUSED | STOPPED
const PLAYING = 'PLAYING';
const PAUSED = 'PAUSED';

export const audioStatuses = {
	PLAYING,
	PAUSED,
};

export const setAudioStatus = status => ({
	type: SET_AUDIO_STATUS,
	payload: status,
});

const initState = PAUSED;

export default (state = initState, { type, payload }) => {
	switch (type) {
		case SET_AUDIO_STATUS:
			return payload;
		default:
			return state;
	}
};
