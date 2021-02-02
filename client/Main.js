import React from 'react';
import SingleAlbum from './SingleAlbum';
import AllAlbums from './AllAlbums';
import Player from './Player';
import Sidebar from './Sidebar';
import axios from 'axios';

const audio = document.createElement('audio');

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			albums: [],
			selectedAlbum: null,
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

	start(audioUrl) {
		audio.src = audioUrl;
		audio.load();
		audio.play();
	}

	render() {
		const albums = this.state.albums;
		const selectedAlbum = this.state.selectedAlbum;
		return (
			<div id='main' className='row container'>
				{/* <!-- Sidebar --> */}
				<Sidebar home={this.home} />

				{/* Albums */}
				<div className='container'>
					{/* check if selectedAlbum AND id
					check first for defined, second for var defined */}
					{selectedAlbum && selectedAlbum.id ? (
						/* if singleAlbum hasn't been selected, all albums render */
						<SingleAlbum
							selectedAlbum={selectedAlbum}
							start={this.start}
						/>
					) : (
						<AllAlbums
							albums={albums}
							clickHandler={this.clickHandler}
						/>
					)}
				</div>

				{/* <!-- Player --> */}
				<Player />
			</div>
		);
	}
}
