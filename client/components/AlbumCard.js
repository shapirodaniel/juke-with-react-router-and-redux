import React from 'react';

const AlbumCard = ({ album }) => {
	const { name, artworkUrl, artist } = album;

	return (
		<div className='album'>
			<img src={artworkUrl} />
			<p>{name}</p>
			<small>{artist.name}</small>
		</div>
	);
};

export default AlbumCard;
