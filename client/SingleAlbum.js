import React from 'react';

// a specific-album view that lists all songs on an album

export default function SingleAlbum(props) {
	const { selectedAlbum } = props;
	console.log('this is props in singleAlbum: ', props);
	return (
		<div id='selectedAlbums' className='row wrap'>
			<div key={selectedAlbum.id} className='selectedAlbum'>
				<a>
					<img src={selectedAlbum.artworkUrl} />
					<p>{selectedAlbum.name}</p>
					<small>{selectedAlbum.artist.name}</small>
				</a>
			</div>
		</div>
	);
}
