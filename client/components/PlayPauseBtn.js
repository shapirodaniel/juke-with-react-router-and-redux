import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { setPaused } from '../redux/audio';
import { handlePlayerBtnClick } from './Audio';

const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';

class PlayPauseBtn extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const {
			song,
			currentSong,
			audioRef,
			isPaused,
			setPaused,
			updateCurrentSong,
		} = this.props;

		setPaused(song.id === currentSong.id && !isPaused);
		updateCurrentSong(song);
		handlePlayerBtnClick(audioRef, song.audioUrl);
	}

	render() {
		const { song, currentSong, isPaused } = this.props;

		return (
			<i
				className={
					song.id === currentSong.id && !isPaused ? pauseIcon : playIcon
				}
				onClick={this.handleClick}
			/>
		);
	}
}

const mapState = state => ({
	audioRef: state.audio.audioRef,
	currentSong: state.currentSong,
	isPaused: state.audio.isPaused,
});

const mapDispatch = dispatch => ({
	updateCurrentSong: thisSong => dispatch(setCurrentSong(thisSong)),
	setPaused: status => dispatch(setPaused(status)),
});

export default connect(mapState, mapDispatch)(PlayPauseBtn);
