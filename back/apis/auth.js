const express = require("express");
const router = express.Router();
const AuthService = require("../services/AuthService");

const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middlewares/auth");
const User = require("../../models/User");

/**
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
router.get('/', auth, async function (req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Err');
  }
});

router.post('/',
  async (req, res) => {
    const { id, nickname, email, thumbnail_image_url } = req.body;
    if (!id || !nickname || !email || !thumbnail_image_url) {
      const missParameters = Object.entries({
        id,
      })
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
      res.status(200).send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
      return;
    }
    await AuthService.signup({
      id, nickname, email, thumbnail_image_url
    })
      .then(({
        json
      }) => {
        res.send(json)
      }).catch(err => {
        res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
      })
  })


/**
 *  @route Post api/auth
 *  @desc Authenticate user & get token
 *  @access Public
 */
router.post('/',
  [
    check('email', 'Please include a valid email').isEmail(),
  ], async (req, res) => {

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({
          errors: [{ msg: 'Invalid Credentials' }]
        });
      }
      // Encrpyt password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({
          errors: [{ msg: 'Invalid Credentials' }]
        });
      }
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecretKey'),
        { expiresIn: 36000, },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
