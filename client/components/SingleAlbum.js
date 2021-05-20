import React from 'react';
import { connect } from 'react-redux';
import { setCurrentAlbum } from '../redux/currentAlbum';
import { Album, Songs } from './';

class SingleAlbum extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadCurrentAlbum(this.props.match.params.id);
	}

	render() {
		const { currentAlbum, toggleOne, isPlaying, currentSong } = props;

		return (
			<div id='single-album' className='column'>
				<Album album={currentAlbum} />
				<Songs
					songs={album.songs}
					toggleOne={toggleOne}
					isPlaying={isPlaying}
					currentSong={currentSong}
				/>
			</div>
		);
	}
}

const mapState = state => ({
	albums: state.albums,
	currentAlbum: state.currentAlbum,
});

const mapDispatch = dispatch => ({
	loadCurrentAlbum: album => dispatch(setCurrentAlbum(album)),
});

export default connect(mapState, mapDispatch)(SingleAlbum);
