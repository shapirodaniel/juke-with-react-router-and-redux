import React, { useEffect, useContext } from 'react';
import { Context } from '../context/Provider';
import { Link, useParams } from 'react-router-dom';
import { AlbumCard, AllSongs } from './';

const SingleAlbum = () => {
	const { id } = useParams();

	const { state, fetchCurrentAlbum } = useContext(Context);

	const { currentAlbum } = state;

	useEffect(() => {
		fetchCurrentAlbum(id);
	}, []);

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
};

export default SingleAlbum;
