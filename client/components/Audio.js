import React from 'react';
import { connect } from 'react-redux';
class Audio extends React.Component {
	componentDidMount() {
		const { audioSrc } = this.props || '';
		// if-check only sets audioSrc when it's defined
		// since audioSrc is initialized to empty string
		if (audioSrc) document.getElementById('audioElement').src = audioSrc;
	}

	render() {
		const { audioSrc } = this.props || '';
		return <audio id='audioElement' src={audioSrc} />;
	}
}

const mapState = state => ({
	audioSrc: state.audio.src,
});

export default connect(mapState)(Audio);
