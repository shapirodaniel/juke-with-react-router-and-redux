import React from 'react';
import { connect } from 'react-redux';
import PlayPauseBtn from './PlayPauseBtn';

class SingleSong extends React.Component {
	render() {
		const { song, currentSong, isPaused, trackNumber } = this.props;
		const { name, artist, genre } = song;
		const isSelected = !currentSong.id || currentSong.id === song.id;
		const isActiveSong = isSelected && !isPaused;

		return (
			<tr className={isActiveSong ? 'active' : ''}>
				<td>
					{/* song prop used to compare against currentSong and conditionally render single song play/pause btn icons */}
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
	isPaused: state.isPaused,
});

export default connect(mapState)(SingleSong);
