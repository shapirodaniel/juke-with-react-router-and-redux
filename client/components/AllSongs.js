import React from 'react';
import SingleSong from './SingleSong';

const AllSongs = ({ songs }) => (
	<table id='songs'>
		<tbody>
			<tr className='gray'>
				{['', '#', 'Name', 'Artist', 'Genre'].map((td, idx) => (
					<td key={idx}>{td}</td>
				))}
			</tr>
			{songs &&
				songs.map((song, songIdx) => {
					return (
						<SingleSong key={song.id} song={song} trackNumber={songIdx + 1} />
					);
				})}
		</tbody>
	</table>
);

export default AllSongs;
