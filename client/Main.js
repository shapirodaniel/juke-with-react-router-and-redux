import React from 'react';
import SingleAlbum from './SingleAlbum';
import AllAlbums from './AllAlbums';
import axios from 'axios';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			albums: [],
			selectedAlbum: null,
		};
		this.clickHandler = this.clickHandler.bind(this);
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

	render() {
		const albums = this.state.albums;
		const selectedAlbum = this.state.selectedAlbum;
		return (
			<div id='main' className='row container'>
				{/* <!-- Sidebar --> */}
				<div id='sidebar'>
					<img src='juke.svg' id='logo' />
					<section>
						<h4>
							<a>ALBUMS</a>
						</h4>
					</section>
				</div>

				{/* Albums */}
				<div className='container'>
					{/* check if selectedAlbum AND id
					check first for defined, second for var defined */}
					{selectedAlbum && selectedAlbum.id ? (
						/* if singleAlbum hasn't been selected, all albums render */
						<SingleAlbum
							selectedAlbum={selectedAlbum}
							clickHandler={this.clickHandler}
						/>
					) : (
						<AllAlbums
							albums={albums}
							clickHandler={this.clickHandler}
						/>
					)}
				</div>

				{/* <!-- Player --> */}
				<div id='player-container'>
					<div id='player-controls'>
						<div className='row center'>
							<i className='fa fa-step-backward'></i>
							<i className='fa fa-pause-circle'></i>
							<i className='fa fa-step-forward'></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
