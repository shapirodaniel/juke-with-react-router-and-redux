import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { AllAlbums, SingleAlbum } from './components';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path={'/albums'} component={AllAlbums} />
				<Route exact path={'/albums/:id'} component={SingleAlbum} />
				{/* push the user to /albums on any other URL */}
				<Redirect to={'/albums'} />
			</Switch>
		</Router>
	);
};

export default Routes;
