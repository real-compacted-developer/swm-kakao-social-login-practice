const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

const {
  User
} = require('../models');

module.exports = {
  signup: ({
    id, email, thumbnail_image_url, nickname
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.create({
          id: id,
          email: email,
          name: nickname,
          profileImage: thumbnail_image_url,
        });
        resolve({
          json: utils.successTrue(sc.SUCCESS, rm.JOIN_SUCCESS, user)
        });
      }
      catch (error) {
        reject({
          json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, "로그인실패")
        });
      }
    });
  },
  read: ({
    id
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({
          where: {
            id: id
          }
        });
        console.log(user);
        if (user !== null) {
          resolve({
            json: utils.successTrue(sc.SUCCESS, rm.LOGIN_SUCCESS, true)
          });
        }
        resolve({
          json: utils.successFalse(sc.SUCCESS, "환영합니다.")
        });

      } catch (err) {
        console.log(err);
        reject({
          json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.JOIN_FAIL)
        });
      }
    });
  },
};
