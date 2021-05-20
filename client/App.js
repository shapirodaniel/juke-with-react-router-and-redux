import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Audio, Player } from './components';
import Routes from './Routes';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Audio />
				<Routes />
				<Player />
			</Provider>
		);
	}
}

export default App;
