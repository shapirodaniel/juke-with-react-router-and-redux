import React from 'react';
import { connect } from 'react-redux';
import { AUDIO, setAudioSrc, playAudio, pauseAudio } from '../AUDIO';

class SingleSong extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	async handleClick(newSrc) {
		// if audio doesn't have an src yet
		// or the current src doesn't equal the one passed
		// set it
		if (!AUDIO.src || AUDIO.src !== newSrc) {
			AUDIO.src = newSrc;
		}

		if (AUDIO.playing) {
			AUDIO.pause();
		} else {
			await AUDIO.play();
		}
	}

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
						onClick={() => handleClick(song.audioUrl)}
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
