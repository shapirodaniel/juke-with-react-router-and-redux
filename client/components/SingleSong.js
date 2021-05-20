import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { AUDIO, handlePlayerBtnClick } from '../AUDIO';

class SingleSong extends React.Component {
	render() {
		const { trackNumber, song, currentSong, setCurrentSong } = this.props;
		const { name, artist, genre } = song;

		return (
			// placeholder logic
			<tr className={currentSong.id === song.id ? 'active' : ''}>
				<td>
					<i
						// placeholder logic
						className={
							currentSong.id === song.id && !AUDIO.paused
								? 'fa fa-pause-circle'
								: 'fa fa-play-circle'
						}
						onClick={() => {
							setCurrentSong(song);
							handlePlayerBtnClick(song.audioUrl);
						}}
					/>
				</td>
				<td>{trackNumber}</td>
				<td>{name}</td>
				<td>{artist.name}</td>
				<td>{genre}</td>
			</tr>
		);
	}
}

const mapState = state => ({
	currentSong: state.currentSong,
});

const mapDispatch = dispatch => ({
	setCurrentSong: song => dispatch(setCurrentSong(song)),
});

export default connect(mapState, mapDispatch)(SingleSong);
