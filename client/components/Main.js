import React from 'react';
import axios from 'axios';
import { Sidebar, SingleAlbum, AlbumsList, Player } from './';

export default class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			albums: [],
			selectedAlbum: {},
		};
		this.pickAlbum = this.pickAlbum.bind(this);
		this.deselectAlbum = this.deselectAlbum.bind(this);

		console.log('Main constructor done!');
	}

	async componentDidMount() {
		console.log('Main componentDidMount executing!');
		const { data } = await axios.get('/api/albums');
		this.setState({
			albums: data,
		});
	}

	// Option 1: Original solution
	// pickAlbum (albumId) {
	//   return async () => {
	//     const {data} = await axios.get(`/api/albums/${albumId}`)
	//     this.setState({
	//       selectedAlbum: data
	//     })
	//   }
	// }

	// Option 2: Morning Review solution
	async pickAlbum(albumId) {
		const { data } = await axios.get(`/api/albums/${albumId}`);
		this.setState({
			selectedAlbum: data,
		});
	}

	deselectAlbum() {
		this.setState({
			selectedAlbum: {},
		});
	}

	componentDidUpdate() {
		console.log('Main updated (componentDidUpdate)!');
	}

	render() {
		const { next, prev, toggle, toggleOne, currentSong, isPlaying } =
			this.props;
		console.log('Main rendered!');

		return (
			<div id='main' className='row container'>
				<Sidebar deselectAlbum={this.deselectAlbum} />
				<div className='container'>
					{this.state.selectedAlbum.id ? (
						<SingleAlbum
							album={this.state.selectedAlbum}
							toggleOne={toggleOne}
							isPlaying={isPlaying}
							currentSong={currentSong}
						/>
					) : (
						<AlbumsList albums={this.state.albums} pickAlbum={this.pickAlbum} />
					)}
				</div>
				<Player prev={prev} next={next} toggle={toggle} isPlaying={isPlaying} />
			</div>
		);
	}
}
