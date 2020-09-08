const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

const {
  User
} = require('../models');

module.exports = {
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
