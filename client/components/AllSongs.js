import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import SingleSong from './SingleSong';

class AllSongs extends React.Component {
	render() {
		const { songs } = this.props;

		return (
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

export default connect(mapState, mapDispatch)(AllSongs);
