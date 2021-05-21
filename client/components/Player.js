import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { isPaused } from '../redux/isPaused';
import { AUDIO, handlePlayerBtnClick } from '../AUDIO';
import PlayPauseBtn from './PlayPauseBtn';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';

class Player extends React.Component {
	/* 	constructor(props) {
		super(props);
		this.state = {
			lastAlbum: this.props.currentAlbum || {},
		};
	} */

	render() {
		const { currentAlbum, currentSong, setPreviousSong, setNextSong } =
			this.props;

		return (
			<div id='player-container'>
				<div id='player-controls'>
					<div id='current-album'>
						<img src={currentAlbum.artworkUrl} />
						<span>
							{currentAlbum.name} |{' '}
							{currentAlbum.artist && currentAlbum.artist.name}
						</span>
					</div>
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
					{/* AUDIO's ontimeupdate fn will populate this div */}
					<div id='track-name-and-time'>
						<span id='track-name'>{currentSong.name}</span>
						<span id='track-time'></span>
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

// seek logic: if user navigates to a new album, seeking will automatically start at track 1 of the new album

const mapDispatch = dispatch => ({
	setPreviousSong: (currentAlbum, currentSong) => {
		// early return if currentAlbum undefined
		// user has refreshed or navigated directly to all albums view
		if (!currentAlbum.songs) return;

		let previousIndex =
			currentAlbum.songs.findIndex(song => song.id === currentSong.id) - 1;

		if (previousIndex < 0) {
			previousIndex = currentAlbum.songs.length - 1;
		}

		const previousSong = currentAlbum.songs[previousIndex];

		dispatch(setCurrentSong(previousSong));
		const status = handlePlayerBtnClick(previousSong.audioUrl);
		dispatch(isPaused(status));
	},

	setNextSong: (currentAlbum, currentSong) => {
		// see setPreviousSong
		if (!currentAlbum.songs) return;

		let nextIndex =
			currentAlbum.songs.findIndex(song => song.id === currentSong.id) + 1;

		if (nextIndex === currentAlbum.songs.length) {
			nextIndex = 0;
		}

		const nextSong = currentAlbum.songs[nextIndex];

		dispatch(setCurrentSong(nextSong));
		const status = handlePlayerBtnClick(nextSong.audioUrl);
		dispatch(isPaused(status));
	},
});

export default connect(mapState, mapDispatch)(Player);
