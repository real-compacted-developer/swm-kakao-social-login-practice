const jwt = require('jsonwebtoken');
const { secretOrPrivateKey } = require('../config/jwtSecretKey');

module.exports = {
  sign: (user) => {
    const payload = {
      id: user.id,
      isPremium: user.isPremium,
    };
    const options = {
      algorithm: "HS256", //H256(algorithm)에 해당하는 header, payload, signiture가 있음(내정)
      expiresIn: "12h",
      issuer: "ConnectClass"
    };

    const result = {
      token: 'Bearer ' + jwt.sign(payload, secretOrPrivateKey, options),
    };
    return result;
  },
  verify: (token) => {
    try {
      // verify 함수 : JWT 토큰을 해독하는 함수
      // 첫 번째 인자(token) : 해독할 JWT 토큰
      // 두 번째 인자(secretOrPublicKey) : JWT를 암호화시켰던 비밀번호
      // 출력값 : JWT 토큰에 담겨있었던 payload
      let decodedPayload = jwt.verify(token, secretOrPrivateKey);
      // console.log(decodedPayload)
      return decodedPayload;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  },
};