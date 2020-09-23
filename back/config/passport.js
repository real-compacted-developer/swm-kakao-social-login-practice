var KakaoStrategy = require('passport-kakao').Strategy;

passport.use(new KakaoStrategy({
  clientID: config.kakao.clientID,
  callbackURL: config.kakao.callbackURL
}, function (_, _, profile, done) {
  User.findOne({
    'kakao.id': profile.id
  }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      user = new User({
        name: profile.username,
        username: profile.id,
        roles: ['authenticated'],
        provider: 'kakao',
        kakao: profile._json
      });

      user.save(function (err) {
        if (err) {
          console.log(err);
        }
        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}
));