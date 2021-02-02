import React from 'react';

// a specific-album view that lists all songs on an album

export default function SingleAlbum(props) {
	const { selectedAlbum, start } = props;
	return (
		<div id='single-album' className='column'>
			<div className='album'>
				<a>
					<img src={selectedAlbum.artworkUrl} />
					<p>{selectedAlbum.name}</p>
					<small>{selectedAlbum.artist.name}</small>
				</a>
			</div>
			<table id='songs'>
				<tbody>
					<tr className='gray'>
						<td />
						<td>{selectedAlbum.id}</td>
						<td>{selectedAlbum.name}</td>
						<td>{selectedAlbum.artist.name}</td>
						<td>{selectedAlbum.songs[0].genre}</td>
					</tr>
					{selectedAlbum.songs.map((song, i) => {
						return (
							<tr key={i}>
								<td>
									<i
										className='fa fa-play-circle'
										onClick={() => start(song.audioUrl)}
									/>
								</td>
								<td>{song.id}</td>
								<td>{song.name}</td>
								<td>{selectedAlbum.artist.name}</td>
								<td>{song.genre}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
