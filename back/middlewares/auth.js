const jwt = require('../module/jwt');
const resMessage = require('../module/util/responseMessage');
const statusCode = require('../module/util/statusCode');
const util = require('../module/util/utils');
const middleware = {
  /**
   * 대부분의 라우터에 쓰이므로, 사용하기 쉽게 미들웨어 형태(req, res, next를 인자로 받는 함수)로 만들었다.
   * 미들웨어의 기능
   * 1. token이 있는지 없는지 확인
   * - token이 있다면 verify 함수를 이용해서 JWT 토큰의 정보를 해독
   * 2.1. token이 있다면 verify 함수를 이용해서 JWT 토큰의 정보를 해독
   * (+) 해독한 정보를 req.decoded에 할당해서, 다음 미들웨어에서 쓸 수 있도록 만들기
   * (req.decoded가 있는지 없는지를 통해서 로그인 유무를 확인하는 용도로 쓸 수 있다.)
   * 2.2. token이 없다면 에러 응답 메시지 출력
   * 3. token은 있는데, 만료된 token이거나 잘못된 token일 경우 에러 응답 메시지 출력
   */
  isLoggedIn: async (req, res, next) => {
    try {
      /**
       * Express에서 req.headers의 값들은 자동적으로 소문자로 변환시켜서 
       * Authorization으로 요청하더라도 authorization으로 값이 출력된다.
       * (단, Request를 할 때는 반드시 Authorization을 header에 담아서 요청해야 한다.)
      */
      let { authorization } = req.headers;
      // console.log('req.headers : ', req.headers);
      // console.log('req.headers.authorization : ', authorization);

      // 토큰이 헤더에 없는 경우
      if (!authorization) {
        res.status(200).json(util.successFalse(statusCode.UNAUTHORIZED, resMessage.EMPTY_TOKEN));

        // 토큰이 헤더에 있는 경우
      } else {
        // Access Token이 Bearer로 시작하는 경우
        if (authorization.startsWith('Bearer ')) {
          authorization = authorization.slice(7, authorization.length);

          //만든 jwt 모듈 사용하여 토큰 확인
          const user = jwt.verify(authorization);
          req.decoded = user;
          next();

          // Access Token이 Bearer로 시작하지 않는 경우
        } else {
          console.log('Bearer 에러');
          res.status(200).json(util.successFalse(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }
      }
    } catch (err) {
      // console.log('verify에서 throw한 err를 받음');
      if (err.name === 'TokenExpiredError') {
        res.status(200).json(util.successFalse(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
      } else if (err.name === 'JsonWebTokenError') {
        res.status(200).json(util.successFalse(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
      } else {
        res.status(200).json(util.successFalse(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
      }
    }
  },
}
module.exports = middleware;