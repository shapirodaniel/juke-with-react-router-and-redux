import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Player, Sidebar } from './components';
import Routes from './Routes';
class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
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
