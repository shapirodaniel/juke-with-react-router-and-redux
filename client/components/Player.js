import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { isPaused } from '../redux/isPaused';
import { handlePlayerBtnClick } from '../AUDIO';
import PlayPauseBtn from './PlayPauseBtn';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';

class Player extends React.Component {
	render() {
		const { currentAlbum, currentSong, setPreviousSong, setNextSong } =
			this.props;

		return (
			<div id='player-container'>
				<div id='player-controls'>
					<div className='row center'>
						<i
							className={backIcon}
							onClick={() => {
								setPreviousSong(currentAlbum, currentSong);
							}}
						/>
						{/* play/pause btn requires a song prop, which is used to conditionally render the btn icon -- by passing currentSong here, we are asserting that this play/pause btn will always be the active one for any play/pause action */}
						<PlayPauseBtn song={currentSong} />
						<i
							className={forwardIcon}
							onClick={() => setNextSong(currentAlbum, currentSong)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
	currentAlbum: state.currentAlbum,
	currentSong: state.currentSong,
});

const mapDispatch = dispatch => ({
	// if previousIndex reaches 0
	// wrap around to last song
	setPreviousSong: (currentAlbum, currentSong) => {
		console.log(
			currentAlbum.songs.findIndex(song => song.id === currentSong.id)
		);

		const previousIndex =
			currentAlbum.songs.findIndex(song => song.id === currentSong.id) - 1 ===
			-1
				? currentAlbum.songs.length - 1
				: currentAlbum.songs.findIndex(song => song.id === currentSong.id) - 1;
		const previousSong = currentAlbum.songs[previousIndex];
		dispatch(setCurrentSong(previousSong));
		const status = handlePlayerBtnClick(previousSong.audioUrl);
		dispatch(isPaused(status));
	},

	setNextSong: (currentAlbum, currentSong) => {
		// if nextIndex exceeds album length
		// wrap around to first song
		const nextIndex =
			currentAlbum.songs.findIndex(song => song.id === currentSong.id) + 1 ===
			currentAlbum.songs.length
				? 0
				: currentAlbum.songs.findIndex(song => song.id === currentSong.id) + 1;
		const nextSong = currentAlbum.songs[nextIndex];
		dispatch(setCurrentSong(nextSong));
		const status = handlePlayerBtnClick(nextSong.audioUrl);
		dispatch(isPaused(status));
	},
});

export default connect(mapState, mapDispatch)(Player);
