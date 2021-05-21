import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAlbums } from '../redux/albums';
import { AlbumCard } from './';

const AllAlbums = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAlbums());
	}, []);

	const albums = useSelector(state => state.albums);

	return (
		<div id='albums' className='row wrap'>
			{albums.map(album => (
				<Link key={album.id} to={`/albums/${album.id}`}>
					<AlbumCard album={album} />
				</Link>
			))}
		</div>
	);
};

export default AllAlbums;
