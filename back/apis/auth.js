const express = require("express");
const router = express.Router();
const AuthService = require("../services/AuthService");

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
module.exports = router;
