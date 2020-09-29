import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import KaKaoLogin from 'react-kakao-login';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const Login = ({ login, isAuthenticated }: any) => {
	const responseKaKao = async (res: any) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const data: Object = {
			id: res.profile.id,
			nickname: res.profile.kakao_account.profile.nickname,
			email: res.profile.kakao_account.email,
			thumbnail_image_url: res.profile.kakao_account.profile.thumbnail_image_url,
		};
		const body = JSON.stringify(data);

		try {
			const res = await axios.post('/api/auth', body, config);
			console.log('res : ', res.data.data.token);
			const msg: string = JSON.stringify(res.data.success);
			console.log('success : ', res.data.success);
			if (msg === 'true') {
				alert('로그인 성공.');
				localStorage.setItem('token', res.data.data.token);
				console.log('localStorage : ', localStorage.getItem('token'));
			} else {
				alert('DB 오류입니다.');
			}
		} catch (err) {
			sessionStorage.clear();
			alert(err);
		}
	};
	const responseFail = (err: any) => {
		alert(err);
	};
	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/' />;
	}
	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign into Your Account
			</p>
			<KaKaoBtn
				jsKey={process.env.REACT_APP_KAKAO_KEY!}
				buttonText='카카오 계정으로 로그인'
				onSuccess={responseKaKao}
				onFailure={responseFail}
				getProfile={true}
			/>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const KaKaoBtn = styled(KaKaoLogin)`
	padding: 0;
	width: 190px;
	height: 44px;
	line-height: 44px;
	color: #783c00;
	background-color: #ffeb00;
	border: 1px solid transparent;
	border-radius: 3px;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	cursor: pointer;
	&:hover {
		box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
	}
`;
export default connect(mapStateToProps, { login })(Login);
