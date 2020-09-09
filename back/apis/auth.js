const express = require("express");
const router = express.Router();
const AuthService = require("../services/AuthService");
const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    const missParameters = Object.entries({
      id
    })
      .filter(it => it[1] == undefined).map(it => it[0]).join(',');
    res.status(200).send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
    return;
  }
  AuthService.read({
    id
  })
    .then(({
      json
    }) =>
      res.send(json)
    ).catch(err => {
      console.log(err);
      res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    })
});

router.post('/',
  async (req, res) => {
    const { id, email, thumbnail_image_url, nickname } = req.body;
    if (!id || !email || !thumbnail_image_url || !nickname) {
      const missParameters = Object.entries({
        id,
        email,
        thumbnail_image_url,
        nickname
      })
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
      res.status(200).send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
      return;
    }
    console.log({ id, email, thumbnail_image_url, nickname });
    AuthService.signup({
      id, email, thumbnail_image_url, nickname
    })
      .then(({
        json
      }) =>
        res.send(json)
      ).catch(err => {
        res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
      })
  });


module.exports = router;
