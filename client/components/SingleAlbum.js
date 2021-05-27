import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentAlbum } from '../redux/currentAlbum';
import { AlbumCard, AllSongs } from './';

class SingleAlbum extends React.Component {
	componentDidMount() {
		this.props.fetchCurrentAlbum(this.props.match.params.id);
	}

	render() {
		const { currentAlbum } = this.props;

		return (
			<div id='single-album' className='column'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<AlbumCard album={currentAlbum} />
					<Link to='/'>
						<div className='backBtn'>{'<< Back To All Albums'}</div>
					</Link>
				</div>
				<AllSongs songs={currentAlbum.songs} />
			</div>
		);
	}
}

const mapState = state => ({
	currentAlbum: state.currentAlbum,
});

const mapDispatch = dispatch => ({
	fetchCurrentAlbum: id => dispatch(fetchCurrentAlbum(id)),
});

export default connect(mapState, mapDispatch)(SingleAlbum);
