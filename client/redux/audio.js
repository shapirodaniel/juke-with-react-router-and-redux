const SET_AUDIO_REF = 'SET_AUDIO_REF';
const UPDATE_TRACK_TIME = 'UPDATE_TRACK_TIME';

export const setAudioRef = audioRef => ({
	type: SET_AUDIO_REF,
	payload: audioRef,
});
export const updateTrackTime = trackTime => ({
	type: UPDATE_TRACK_TIME,
	payload: trackTime,
});

const initState = {
	audioRef: null,
	trackTime: '',
};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case SET_AUDIO_REF:
			return { ...state, audioRef: payload };
		case UPDATE_TRACK_TIME:
			return { ...state, trackTime: payload };
		default:
			return state;
	}
};
