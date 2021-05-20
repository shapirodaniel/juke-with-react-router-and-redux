import React from 'react';

const AlbumCard = ({ album }) => {
	const { name, artworkUrl, artist } = album;
	const { artistName } = artist || '';

	return (
		<div className='album'>
			<img src={artworkUrl} />
			<p>{name}</p>
			<small>{artistName}</small>
		</div>
	);
};

export default AlbumCard;
