import React from 'react';
import { connect } from 'react-redux';
import { audioStatuses, setAudioStatus } from '../redux/audioStatus';

class Audio extends React.Component {
	componentDidMount() {
		this.props.loadAudioStatus();
	}

	render() {
		return <audio src={''} />;
	}
}

const mapState = state => ({
	audioStatus: state.audioStatus,
});

const mapDispatch = dispatch => ({
	loadAudioStatus: () => dispatch(setAudioStatus(audioStatuses.PAUSED)),
});

export default connect(mapState, mapDispatch)(Audio);
