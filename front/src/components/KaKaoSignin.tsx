import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
import axios from 'axios';
interface State {
	data: any;
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
			data: 'kakao',
			nickname: '',
			email: '',
			profile_image: '',
			age_range: '',
			thumbnail_image_url: '',
		};
	}

	responseKaKao = async (res: any) => {
		this.setState({
			data: res,
			nickname: res.profile.kakao_account.profile.nickname,
			profile_image: res.profile.kakao_account.profile.profile_image_url,
			email: res.profile.kakao_account.email,
			age_range: res.profile.kakao_account.age_range,
			thumbnail_image_url: res.profile.kakao_account.profile.thumbnail_image_url,
		});
		console.log('data : ', this.state.data.profile.kakao_account);

		// const semi_email = JSON.stringify(this.state.data.profile.kakao_account.email);
		// console.log('semi_email : ', semi_email);
		// //const _email = semi_email.replace(/^"+|"+$/g, '');

		// const semi_age = JSON.stringify(this.state.data.profile.kakao_account.age_range[0]);
		// const s_age = semi_age.replace(/^"+|"+$/g, '');
		// const _age = parseInt(s_age);
		// console.log('age : ', _age);

		// try {
		// 	alert(JSON.stringify(this.state.data.profile.id));
		// 	const response = await axios({
		// 		method: 'get',
		// 		url: `localhost:8080/api/user_exist/${JSON.stringify(this.state.data.profile.id)}/`,
		// 		responseType: 'json',
		// 	});
		// 	const msg: string = JSON.stringify(response.data.message);
		// 	if (msg === 'true') {
		// 		alert('로그인되었습니다');
		// 	} else {
		// 		try {
		// 			const signup_response = await axios({
		// 				method: 'post',
		// 				url: `localhost:8080/api/user_list/`,
		// 				data: {
		// 					password: 1234,
		// 					email: _email,
		// 					kakao_id: JSON.stringify(this.state.data.profile.id),
		// 					nickname: JSON.stringify(this.state.data.profile.properties.nickname),
		// 					image: JSON.stringify(this.state.data.profile.properties.profile_image),
		// 					ages: _age,
		// 				},
		// 				responseType: 'json',
		// 			});
		// 			alert(signup_response);
		// 		} catch (err) {
		// 			sessionStorage.clear();
		// 			alert(err);
		// 		}
		// 	}
		// } catch (err) {
		// 	sessionStorage.clear();
		// 	alert(err);
		// }
	};

	responseFail = (err: any) => {
		alert(err);
	};

	render() {
		return (
			<Fragment>
				<h1>카카오톡 간편 로그인</h1>
				<h4>로그인 후 더 많은 혜택을 누리세요!</h4>
				<br></br>
				<KaKaoBtn
					jsKey={'Javascript Key'}
					buttonText='Login with Kakao'
					onSuccess={this.responseKaKao}
					onFailure={this.responseFail}
					getProfile={true}
				/>
				<h4>Nickname : {this.state.nickname}</h4>
				<h4>
					thumbnail_image_url : <img src={this.state.thumbnail_image_url} />
				</h4>
				<h4> email : {this.state.email}</h4>
				<h4>age_range : {this.state.age_range}</h4>
				<h4>
					profile_image : <img src={this.state.profile_image} />
				</h4>
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
