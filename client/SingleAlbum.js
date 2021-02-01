import React from 'react';

export default function SingleAlbum(props) {
	const { album, clickHandler } = props;
	console.log('album called by SingleAlbum', album);
	console.log('albumId is: ', album.id);
	return (
		<div id='albums' className='row wrap'>
			<div key={album.id} className='album'>
				<a onClick={() => clickHandler(album.id)}>
					<img src={album.artworkUrl} />
					<p>{album.name}</p>
					<small>{album.artist.name}</small>
				</a>
			</div>
		</div>
	);
}
