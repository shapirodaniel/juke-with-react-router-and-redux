import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { setPaused } from '../redux/audio';
import { handlePlayerBtnClick } from './Audio';
import PlayPauseBtn from './PlayPauseBtn';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.setPreviousSong = this.setPreviousSong.bind(this);
		this.setNextSong = this.setNextSong.bind(this);
	}

	// functions for song navigation
	setPreviousSong(currentAlbum, currentSong, audioRef) {
		if (!currentAlbum.songs) return;

		let previousIndex =
			currentAlbum.songs.findIndex(song => song.id === currentSong.id) - 1;

		if (previousIndex < 0) {
			previousIndex = currentAlbum.songs.length - 1;
		}

		const previousSong = currentAlbum.songs[previousIndex];

		this.props.setCurrentSong(previousSong);
		handlePlayerBtnClick(audioRef, previousSong.audioUrl);
		this.props.setPaused(audioRef.paused);
	}

	setNextSong(currentAlbum, currentSong, audioRef) {
		if (!currentAlbum.songs) return;

		let nextIndex =
			currentAlbum.songs.findIndex(song => song.id === currentSong.id) + 1;

		if (nextIndex === currentAlbum.songs.length) {
			nextIndex = 0;
		}

		const nextSong = currentAlbum.songs[nextIndex];

		this.props.setCurrentSong(nextSong);
		handlePlayerBtnClick(audioRef, nextSong.audioUrl);
		this.props.setPaused(audioRef.paused);
	}

	render() {
		const { currentAlbum, currentSong, audioRef, trackTime } = this.props;

		return (
			<div id='player-container'>
				<div id='player-controls'>
					<div id='current-album'>
						<img src={currentAlbum.artworkUrl} />
						<span>
							{currentAlbum.name}
							{currentAlbum.name && ' | '}
							{currentAlbum.artist && currentAlbum.artist.name}
						</span>
					</div>
					<div className='row center'>
						<i
							className={backIcon}
							onClick={() =>
								this.setPreviousSong(currentAlbum, currentSong, audioRef)
							}
						/>
						{/* play/pause btn requires a song prop, which is used to conditionally render the btn icon -- by passing currentSong here, we are asserting that this play/pause btn will always be the active one for any play/pause action */}
						<PlayPauseBtn song={currentSong} />
						<i
							className={forwardIcon}
							onClick={() =>
								this.setNextSong(currentAlbum, currentSong, audioRef)
							}
						/>
					</div>
					{/* audioRef's onTimeUpdate event handler makes trackTime available on the redux store's audio object */}
					<div id='track-name-and-time'>
						{/* only show song name once track has loaded */}
						<span id='track-name'>{trackTime ? currentSong.name : ''}</span>
						<span id='track-time'>{trackTime}</span>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
	audioRef: state.audio.audioRef,
	trackTime: state.audio.trackTime,
	currentAlbum: state.currentAlbum,
	currentSong: state.currentSong,
});

const mapDispatch = dispatch => ({
	setCurrentSong: song => dispatch(setCurrentSong(song)),
	setPaused: status => dispatch(setPaused(status)),
});

export default connect(mapState, mapDispatch)(Player);
