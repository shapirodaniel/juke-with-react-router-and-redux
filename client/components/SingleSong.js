import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { AUDIO, handlePlayerBtnClick } from '../AUDIO';

class SingleSong extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			btnType: 'fa fa-play-circle',
		};
		this.toggleBtn = this.toggleBtn.bind(this);
	}

	toggleBtn() {
		this.setState(state => {
			const change =
				state.btnType === 'fa fa-play-circle'
					? 'fa fa-pause-circle'
					: 'fa fa-play-circle';

			return { btnType: change };
		});
	}

	render() {
		const { trackNumber, song, currentSong, setCurrentSong } = this.props;
		const { name, artist, genre } = song;

		const isSelected = () => currentSong.id === song.id;

		const isActiveSong = () => isSelected() && !AUDIO.paused;

		const getBtnClass = () => {
			if (isActiveSong()) return 'fa fa-pause-circle';
			else return 'fa fa-play-circle';
		};

		return (
			<tr className={isActiveSong() ? 'active' : ''}>
				<td>
					<i
						className={getBtnClass()}
						onClick={() => {
							// only set song if not already selected
							if (!isSelected()) setCurrentSong(song);

							// toggle audio element status
							handlePlayerBtnClick(song.audioUrl);

							// toggle btn icon
							this.toggleBtn();
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
