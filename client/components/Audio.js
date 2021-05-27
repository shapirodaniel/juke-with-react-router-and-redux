import React from 'react';
import { connect } from 'react-redux';
import { updateTrackTime, setAudioRef } from '../redux/audio';
import { formatTime, setAudioSrc, playAudio, pauseAudio } from './audioHelpers';

// click handler for audio playback/pause, used by PlayPauseBtn, SingleSong
export const handlePlayerBtnClick = (audioRef, newSrc) => {
	if (!audioRef.current.src || audioRef.current.src !== newSrc) {
		setAudioSrc(audioRef, newSrc);
	}
	audioRef.current.paused ? playAudio(audioRef) : pauseAudio(audioRef);
};

class Audio extends React.Component {
	constructor(props) {
		super(props);
		this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
		this.audioRef = React.createRef(null);
	}

	componentDidMount() {
		this.props.setAudioRef(this.audioRef);
	}

	handleTimeUpdate() {
		const currentPosition = formatTime(
			Math.floor(this.audioRef.current.currentTime)
		);
		const totalTime = formatTime(Math.floor(this.audioRef.current.duration));

		// if-check guards against NaN:NaN totalTime before song has loaded
		if (!isNaN(this.audioRef.current.duration)) {
			this.props.updateTrackTime(`${currentPosition} / ${totalTime}`);
		}
	}

	render() {
		return <audio ref={this.audioRef} onTimeUpdate={this.handleTimeUpdate} />;
	}
}

const mapDispatch = dispatch => ({
	setAudioRef: ref => dispatch(setAudioRef(ref)),
	updateTrackTime: timeString => dispatch(updateTrackTime(timeString)),
});

export default connect(null, mapDispatch)(Audio);
