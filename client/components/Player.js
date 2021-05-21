import React from 'react';
import { connect } from 'react-redux';
import { AUDIO, handlePlayerBtnClick } from '../AUDIO';
import { isPaused } from '../redux/isPaused';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';
const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';

const isPlaying = () => !AUDIO.paused;
class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			btnIcon: playIcon,
		};
	}

	render() {
		const { currentAlbum, currentSong, isPaused, setPaused } = this.props;

		console.log(isPaused);

		return (
			<div id='player-container'>
				<div id='player-controls'>
					<div className='row center'>
						<i className={backIcon} />
						<i
							className={isPaused ? playIcon : pauseIcon}
							onClick={() => {
								const status = handlePlayerBtnClick(currentSong.audioUrl);
								setPaused(status);
							}}
						/>
						<i className={forwardIcon} />
					</div>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
	currentAlbum: state.currentAlbum,
	currentSong: state.currentSong,
	isPaused: state.isPaused,
});

const mapDispatch = dispatch => ({
	// if previousIndex reaches 0
	// wrap around to last song
	setPreviousSong: (currentAlbum, currentSong) => {
		const previousIndex =
			currentAlbum.songs.findIndex(currentSong) - 1 || songs.length - 1;
		const previousSong = currentAlbums.songs[previousIndex];
		dispatch(setCurrentSong(previousSong));
	},

	setNextSong: (currentAlbum, currentSong) => {
		// if nextIndex exceeds album length
		// wrap around to first song
		const nextIndex =
			currentAlbum.songs.findIndex(currentSong) + 1 ===
			currentAlbum.songs.length
				? currentAlbum.songs[0]
				: currentAlbum.songs.findIndex(currentSong) + 1;
		const nextSong = currentAlbums.songs[nextIndex];
		dispatch(setCurrentSong(nextSong));
	},

	setPaused: status => dispatch(isPaused(status)),
});

export default connect(mapState, mapDispatch)(Player);
