import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KaKaoSignin from './components/KaKaoSignin';

class Router extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path='/singin' component={KaKaoSignin} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
