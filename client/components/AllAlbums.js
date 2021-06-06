import React, { useEffect, useContext } from 'react';
import { Context } from '../context/Provider';
import { Link } from 'react-router-dom';
import { AlbumCard } from './';

const AllAlbums = () => {
	const { fetchAlbums, state } = useContext(Context);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) fetchAlbums();
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div id='albums' className='row wrap'>
			{state.albums.map(album => (
				<Link key={album.id} to={`/albums/${album.id}`}>
					<AlbumCard album={album} />
				</Link>
			))}
		</div>
	);
};

export default AllAlbums;
