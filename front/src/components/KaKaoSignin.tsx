import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
import axios from 'axios';
import dotenv from 'dotenv';

console.log('KEY : ', process.env.REACT_APP_KAKAO_KEY);
console.log('TYPE : ', typeof process.env.REACT_APP_KAKAO_KEY);
dotenv.config();
interface State {
	id: string;
	nickname: string;
	email: string;
	profile_image: string;
	thumbnail_image_url: string;
	age_range: string;
}

class KaKaoSignin extends Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			id: '',
			nickname: '',
			email: '',
			profile_image: '',
			age_range: '',
			thumbnail_image_url: '',
		};
	}

	responseKaKao = async (res: any) => {
		this.setState({
			id: res.profile.id,
			nickname: res.profile.kakao_account.profile.nickname,
			email: res.profile.kakao_account.email,
			thumbnail_image_url: res.profile.kakao_account.profile.thumbnail_image_url,
		});

		const response = await axios({
			method: 'get',
			url: `http://localhost:8080/api/auth/${JSON.stringify(res.profile.id)}`,
			responseType: 'json',
		});
		const msg: string = JSON.stringify(response.data.success);
		if (msg === 'true') {
			alert('로그인되었습니다');
			localStorage.setItem('token', response.data.token);
		} else {
			alert('로그인에 실패하셨습니다');
		}
	};

	responseFail = (err: any) => {
		alert(err);
	};

	render() {
		return (
			<Fragment>
				<br></br>
				<KaKaoBtn
					jsKey={process.env.REACT_APP_KAKAO_KEY!}
					buttonText='카카오 계정으로 로그인'
					onSuccess={this.responseKaKao}
					onFailure={this.responseFail}
					getProfile={true}
				/>
			</Fragment>
		);
	}
}

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
