import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import dotenv from 'dotenv';
import Kakao from '../KaKaoSignin';
import Google from '../GoogleSignin';

dotenv.config();

const Login = ({ login, isAuthenticated }: any) => {
	// Redirect if logged in
	if (localStorage.token) {
		return <Redirect to='/' />;
	}
	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign into Your Account
			</p>
			<Kakao />
			<Google />
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
