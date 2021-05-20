import React from 'react';
import { connect } from 'react-redux';
import { handlePlayerBtnClick } from '../AUDIO';

class SingleSong extends React.Component {
	render() {
		const { trackNumber, song } = this.props;
		const { name, artist, genre } = song;
		const { handleClick } = this;

		return (
			// placeholder logic
			<tr className={false ? 'active' : ''}>
				<td>
					<i
						// placeholder logic
						className={false ? 'fa fa-pause-circle' : 'fa fa-play-circle'}
						onClick={() => handlePlayerBtnClick(song.audioUrl)}
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

const mapDispatch = dispatch => ({
	// do something
});

export default connect(null, mapDispatch)(SingleSong);
