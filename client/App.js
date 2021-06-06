import React from 'react';
import Provider from './context/Provider';
import { Audio, Player, Sidebar } from './components';
import Routes from './Routes';

const App = () => (
	<Provider>
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

export default App;
