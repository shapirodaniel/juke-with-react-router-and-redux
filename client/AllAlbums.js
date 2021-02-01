import React from 'react';
import SingleAlbum from './SingleAlbum';

export default function AllAlbums(props) {
	const { albums, clickHandler } = props;
	return (
		<>
			{albums.map(album => {
				return (
					<SingleAlbum
						key={album.id}
						album={album}
						clickHandler={clickHandler}
					/>
				);
			})}
		</>
	);
}
