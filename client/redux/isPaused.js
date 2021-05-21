const IS_PAUSED = 'IS_PAUSED';

export const isPaused = status => ({
	type: IS_PAUSED,
	payload: status,
});

const initState = true;

export default (state = initState, { type, payload }) => {
	switch (type) {
		case IS_PAUSED:
			return payload;
		default:
			return state;
	}
};
