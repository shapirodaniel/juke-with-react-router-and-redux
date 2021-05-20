import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Audio, Player, Sidebar } from './components';
import Routes from './Routes';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Audio />
				<div id='main' className='row container'>
					<Sidebar />
					<div className='container'>
						<Routes />
					</div>
					<Player />
				</div>
			</Provider>
		);
	}
}

export default App;
