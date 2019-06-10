const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/userModel')

const authenticate = passport => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET
  }
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              email: user.email
            })
          }
          return done(null, false)
        })
        .catch(err => console.error(err))
    })
  )
}

module.exports = authenticate
