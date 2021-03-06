import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const KaKaoSignin = () => {
	const responseKaKao = async (res: any) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const data: Object = {
			provider: 'kakao',
			id: res.profile.id.toString(),
			nickname: res.profile.kakao_account.profile.nickname,
			email: res.profile.kakao_account.email,
			profileImage: res.profile.kakao_account.profile.thumbnail_image_url,
			isPremium: false,
		};
		const userId = 'kakao' + res.profile.id;
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
	const responseFail = (err: any) => {
		alert(err);
	};
	// Redirect if logged in
	if (localStorage.token) {
		return <Redirect to='/' />;
	}

	return (
		<Fragment>
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

export default KaKaoSignin;
