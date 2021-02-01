import React from 'react';
import SingleAlbum from './SingleAlbum';

export default function AllAlbums(props) {
	const { albums, clickHandler } = props;

	// a list of all albums

	return (
		<>
			{albums.map(album => {
				console.log('mappedAlbum: ', album);
				return (
					<div class='album'>
						<a onClick={() => clickHandler(album.id)}>
							<img src={album.artworkUrl} />
							<p>{album.name}</p>
							<small>{album.artist.name}</small>
						</a>
					</div>
				);
			})}
		</>
	);
}
