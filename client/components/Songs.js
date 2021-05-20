import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';

const TableHeaders = () => {
	const tdArray = ['', '#', 'Name', 'Artist', 'Genre'];

	return (
		<tr className='gray'>
			{tdArray.map((td, idx) => (
				<td key={idx}>{td}</td>
			))}
		</tr>
	);
};

const SingleSong = ({ song, trackNumber }) => {
	const { name, artist, genre } = song;

	return (
		// placeholder logic
		<tr className={false ? 'active' : ''}>
			<td>
				<i
					// placeholder logic
					className={false ? 'fa fa-pause-circle' : 'fa fa-play-circle'}
				/>
			</td>
			<td>{trackNumber}</td>
			<td>{name}</td>
			<td>{artist.name}</td>
			<td>{genre}</td>
		</tr>
	);
};
class Songs extends React.Component {
	render() {
		const { songs, currentSong, setCurrentSong } = this.props;

		return (
			<table id='songs'>
				<tbody>
					<TableHeaders />
					{songs &&
						songs.map((song, songIdx) => {
							return (
								<SingleSong
									key={song.id}
									song={song}
									trackNumber={songIdx + 1}
								/>
							);
						})}
				</tbody>
			</table>
		);
	}
}

const mapState = state => ({
	currentSong: state.currentSong,
});

const mapDispatch = dispatch => ({
	setCurrentSong: song => dispatch(setCurrentSong(song)),
});

export default connect(mapState, mapDispatch)(Songs);
