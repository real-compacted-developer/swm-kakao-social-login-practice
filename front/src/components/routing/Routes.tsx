import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Main from '../layout/Main';
import NotFound from '../layout/NotFound';

const Routes = () => {
	return (
		<section className='container'>
			<Alert />
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/main' component={Main} />
				<Route component={NotFound} />
			</Switch>
		</section>
	);
};

export default Routes;
