import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AllAlbums, SingleAlbum } from './components';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path={'/'} component={AllAlbums} />
				<Route path='/albums/:id' component={SingleAlbum} />
			</Switch>
		</Router>
	);
};

export default Routes;
