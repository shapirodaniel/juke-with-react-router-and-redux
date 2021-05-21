import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { AUDIO, handlePlayerBtnClick } from '../AUDIO';

class PlayPauseBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			btnIcon: 'fa fa-play-circle',
		};
		this.toggleIcon = this.toggleIcon.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentSong.id !== this.props.currentSong.id) {
			const { currentSong, song } = this.props;
			this.toggleIcon(currentSong, song);
		}
	}

	toggleIcon(currentSong, song) {
		if (!currentSong.id || currentSong.id === song.id) {
			this.setState(state => ({
				btnIcon:
					state.btnIcon === 'fa fa-play-circle'
						? 'fa fa-pause-circle'
						: 'fa fa-play-circle',
			}));
		} else {
			this.setState({ btnIcon: 'fa fa-play-circle' });
		}
	}

	render() {
		const { song, currentSong, setCurrentSong } = this.props;
		const { toggleIcon } = this;

		const handleClick = () => {
			setCurrentSong(song);
			handlePlayerBtnClick(song.audioUrl);
			toggleIcon(currentSong, song);
		};

		return <i className={this.state.btnIcon} onClick={handleClick} />;
	}
}

const mapState = state => ({
	currentSong: state.currentSong,
});

const mapDispatch = dispatch => ({
	setCurrentSong: song => dispatch(setCurrentSong(song)),
});

export default connect(mapState, mapDispatch)(PlayPauseBtn);
