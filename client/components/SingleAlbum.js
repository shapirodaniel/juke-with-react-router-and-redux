import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentAlbum } from '../redux/currentAlbum';
import { AlbumCard, Songs } from './';

class SingleAlbum extends React.Component {
	componentDidMount() {
		console.log(this.props);
		this.props.loadCurrentAlbum(this.props.match.params.id);
	}

	render() {
		const { currentAlbum } = this.props || {};

		return (
			<div id='single-album' className='column'>
				<AlbumCard album={currentAlbum} />
				<Songs songs={currentAlbum.songs} />
			</div>
		);
	}
}

const mapState = state => ({
	currentAlbum: state.currentAlbum,
});

const mapDispatch = dispatch => ({
	loadCurrentAlbum: albumId => dispatch(fetchCurrentAlbum(albumId)),
});

export default connect(mapState, mapDispatch)(SingleAlbum);
