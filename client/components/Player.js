import React from 'react';
import { connect } from 'react-redux';
import { playAudio, pauseAudio, audioStatuses } from '../redux/audio';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';
const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';
class Player extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	previousSong() {
		// do previous song logic
	}

	nextSong() {
		// do next song logic
	}

	handleClick() {
		const { audioStatus, pauseAudio, playAudio } = this.props;
		audioStatus === audioStatuses.PLAYING ? pauseAudio() : playAudio();
	}

	render() {
		const { audioStatus, currentSong } = this.props;
		const { handleClick } = this;

		return (
			<div id='player-container'>
				<div id='player-controls'>
					<div className='row center'>
						<i className={backIcon} />
						<i
							className={
								audioStatus === audioStatuses.PLAYING ? pauseIcon : playIcon
							}
							onClick={handleClick}
						/>
						<i className={forwardIcon} />
					</div>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
	audioStatus: state.audio.status,
	currentSong: state.currentSong,
});

const mapDispatch = dispatch => ({
	playAudio: () => dispatch(playAudio()),
	pauseAudio: () => dispatch(pauseAudio()),
});

export default connect(mapState, mapDispatch)(Player);
