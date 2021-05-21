import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { handlePlayerBtnClick } from '../AUDIO';

const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';

class PlayPauseBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			btnIcon: playIcon,
		};
		this.toggleIcon = this.toggleIcon.bind(this);
	}

	componentDidUpdate(prevProps) {
		// first if-check keeps us from re-toggling the clicked btn
		if (!prevProps.currentSong.id) return;
		// second if-check sets icons for the other btns after clicked btn is toggled
		if (prevProps.currentSong.id !== this.props.currentSong.id) {
			const { currentSong, song } = this.props;
			this.toggleIcon(currentSong, song);
		}
	}

	toggleIcon(currentSong, song) {
		if (!currentSong.id || currentSong.id === song.id) {
			this.setState(state => ({
				btnIcon: state.btnIcon === playIcon ? pauseIcon : playIcon,
			}));
		} else {
			this.setState({ btnIcon: playIcon });
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
