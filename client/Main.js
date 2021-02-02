import React from 'react';
import SingleAlbum from './SingleAlbum';
import AllAlbums from './AllAlbums';
import Player from './Player';
import Sidebar from './Sidebar';
import axios from 'axios';

// bound to window object
// that way only one audio ever exists at a time
// and there isn't a race condition between
// different audio sources on one page!
const audio = document.createElement('audio');

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			albums: [],
			selectedAlbum: null,
			currentSong: '',
		};
		this.clickHandler = this.clickHandler.bind(this);
		this.home = this.home.bind(this);
		this.start = this.start.bind(this);
	}

	async componentDidMount() {
		try {
			const response = await axios.get('/api/albums');
			const albums = response.data;
			this.setState({
				albums: albums,
			});
		} catch (err) {
			console.error(err);
		}
	}

	clickHandler(albumId) {
		axios
			.get(`/api/albums/${albumId}`)
			.then(res => res.data)
			.then(album => this.setState({ selectedAlbum: album }));
	}

	home() {
		this.setState({
			selectedAlbum: null,
		});
	}

	start(song) {
		this.setState({
			currentSong: song.id,
		});
		audio.src = song.audioUrl;
		audio.load();
		audio.play();
	}

	render() {
		const { albums, selectedAlbum, currentSong } = this.state;
		return (
			<div id='main' className='row container'>
				<Sidebar home={this.home} />

				<div className='container'>
					{selectedAlbum && selectedAlbum.id ? (
						<SingleAlbum
							selectedAlbum={selectedAlbum}
							start={this.start}
							currentSong={currentSong}
						/>
					) : (
						<AllAlbums
							albums={albums}
							clickHandler={this.clickHandler}
						/>
					)}
				</div>

				<Player />
			</div>
		);
	}
}
