const SET_AUDIO_REF = 'SET_AUDIO_REF';
const UPDATE_TRACK_TIME = 'UPDATE_TRACK_TIME';
const SET_PAUSED = 'SET_PAUSED';

export const setAudioRef = audioRef => ({
	type: SET_AUDIO_REF,
	payload: audioRef,
});
export const updateTrackTime = trackTime => ({
	type: UPDATE_TRACK_TIME,
	payload: trackTime,
});
export const updatePaused = status => ({
	type: IS_PAUSED,
	payload: status,
});

const initState = {
	audioRef: null,
	trackTime: '',
	isPaused: true,
};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case SET_AUDIO_REF:
			return { ...state, audioRef: payload.audioRef };
		case UPDATE_TRACK_TIME:
			return { ...state, trackTime: payload.trackTime };
		case SET_PAUSED:
			return { ...state, isPaused: payload.status };
		default:
			return state;
	}
};
