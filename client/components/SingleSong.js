import React from 'react';
import { connect } from 'react-redux';
import { AUDIO } from '../AUDIO';
import PlayPauseBtn from './PlayPauseBtn';

class SingleSong extends React.Component {
	render() {
		const { trackNumber, song, currentSong } = this.props;
		const { name, artist, genre } = song;

		const isSelected = !currentSong.id || currentSong.id === song.id;
		const isActiveSong = isSelected && !AUDIO.paused;

		return (
			<tr className={isActiveSong ? 'active' : ''}>
				<td>
					<PlayPauseBtn song={song} />
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

export default connect(mapState)(SingleSong);
