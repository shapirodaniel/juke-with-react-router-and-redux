import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAlbums } from '../redux/albums';
import { AlbumCard } from './';

class AllAlbums extends React.Component {
	componentDidMount() {
		this.props.loadAlbums();
	}

	render() {
		const { albums, pickAlbum, currentSongSrc } = this.props || [];

		return (
			<React.Fragment>
				<div id='albums' className='row wrap'>
					{albums.map(album => (
						<Link key={album.id} to={`/albums/${album.id}`}>
							<AlbumCard album={album} pickAlbum={pickAlbum} />
						</Link>
					))}
				</div>
			</React.Fragment>
		);
	}
}

const mapState = state => ({
	albums: state.albums,
	currentSongSrc: state.currentSong.audioUrl,
});

const mapDispatch = dispatch => ({
	loadAlbums: () => dispatch(fetchAlbums()),
});

export default connect(mapState, mapDispatch)(AllAlbums);
