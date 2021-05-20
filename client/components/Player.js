import React from 'react';
import { connect } from 'react-redux';
import { AUDIO, handlePlayerBtnClick } from '../AUDIO';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';
const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';
class Player extends React.Component {
	render() {
		return (
			<div id='player-container'>
				<div id='player-controls'>
					<div className='row center'>
						<i className={backIcon} />
						{/* // placeholder logic */}
						<i className={true ? pauseIcon : playIcon} />
						<i className={forwardIcon} />
					</div>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
	currentSong: state.currentSong,
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
});

export default connect(mapState, mapDispatch)(Player);
