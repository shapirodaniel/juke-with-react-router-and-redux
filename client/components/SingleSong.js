import React, { useContext } from 'react';
import { Context } from '../context/Provider';
import PlayPauseBtn from './PlayPauseBtn';

const SingleSong = ({ trackNumber, song }) => {
	const { state } = useContext(Context);

	const { currentSong, isPaused } = state;

	const { name, artist, genre } = song;

	const isSelected = !currentSong.id || currentSong.id === song.id;

	// pass down status of audio somehow here?
	const isActiveSong = isSelected && !isPaused;

	return (
		<tr className={isActiveSong ? 'active' : ''}>
			<td>
				{/* song prop used to compare against currentSong and conditionally render single song play/pause btn icons */}
				<PlayPauseBtn song={song} />
			</td>
			<td>{trackNumber}</td>
			<td>{name}</td>
			<td>{artist.name}</td>
			<td>{genre}</td>
		</tr>
	);
};

export default SingleSong;
