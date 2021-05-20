import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentAlbum } from '../redux/currentAlbum';
import { AlbumCard, Songs } from './';

class SingleAlbum extends React.Component {
	componentDidMount() {
		this.props.loadCurrentAlbum(this.props.match.params.id);
	}

	render() {
		const { currentAlbum } = this.props || {};

		return (
			<div id='single-album' className='column'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<AlbumCard album={currentAlbum} />
					<Link
						to='/'
						style={{
							textDecoration: 'none',
							color: 'white',
							padding: '8px',
							height: 'min-content',
						}}
					>
						{'<< Back To All Albums'}
					</Link>
				</div>
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
