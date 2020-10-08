import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GoogleSignin = () => {
	const responseGoogle = async (res: any) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const data: Object = {
			provider: 'google',
			id: res.profileObj.googleId,
			nickname: res.profileObj.name,
			email: res.profileObj.email,
			profileImage: res.profileObj.imageUrl,
			isPremium: false,
		};
		const userId = 'google' + res.profileObj.googleId;
		const user = await axios.get(`http://db.api.connectclass.io/user/${userId}`);
		const isUser: string = JSON.stringify(user.data.success);
		if (isUser === 'true') {
			const token = await axios.post('http://localhost:8080/token', JSON.stringify(user), config);
			localStorage.setItem('token', token.data.token);
			if (localStorage.token) {
				console.log(localStorage.token);
				console.log('Main으로 가라고 로그인 끝났으면');
				return (
					<Redirect
						to={{
							pathname: '/',
						}}
					/>
				);
			}
		} else {
			try {
				const body = JSON.stringify(data);
				const res = await axios.post('http://db.api.connectclass.io/user', body, config);
				const msg: string = JSON.stringify(res.data.success);
				if (msg === 'true') {
					const token = await axios.post('http://localhost:8080/token', body, config);
					localStorage.setItem('token', token.data.token);
				} else {
					alert('DB 오류입니다.');
				}
			} catch (err) {
				alert(err);
			}
		}
	};
	if (localStorage.token) {
		return <Redirect to='/' />;
	}
	return (
		<Fragment>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_KEY!}
				buttonText='구글 계정으로 로그인'
				onSuccess={responseGoogle}
				onFailure={(result) => console.log(result)}
			/>
		</Fragment>
	);
};

const GoogleBtn = styled(GoogleLogin)`
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

export default GoogleSignin;
