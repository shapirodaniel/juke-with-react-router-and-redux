import React from 'react';
import { connect } from 'react-redux';
import { setAudioStatus, audioStatuses } from '../redux/audioStatus';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';
const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';

class Player extends React.Component {
	componentDidMount() {}

	render() {
		const { play, pause, audioStatus } = this.props;

		return (
			<div id='player-container'>
				<div id='player-controls'>
					<div className='row center'>
						<i className={backIcon} />
						<i
							className={
								audioStatus === audioStatuses.PLAYING ? pauseIcon : playIcon
							}
						/>
						<i className={forwardIcon} />
					</div>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
	audioStatus: state.audioStatus,
	currentSong: state.currentSong,
});

const mapDispatch = dispatch => ({
	play: dispatch(setAudioStatus(audioStatuses.PLAYING)),
	pause: dispatch(setAudioStatus(audioStatuses.PAUSED)),
});

export default connect(mapState, mapDispatch)(Player);
