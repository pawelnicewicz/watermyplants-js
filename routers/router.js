const AuthController = require('../controllers/AuthController')
const AuthService = require('../services/AuthService')
const authRouter = require('./authRouter')

const router = (express, passport, errors) => {
  const services = {
    AuthService: new AuthService(errors)
  }

  const controllers = {
    AuthController: new AuthController(services, errors)
  }

  const middleware = {
    authenticate: (req, res, next) => {
      passport.authenticate('jwt', { session: false })
      next()
    }
  }

  const router = express()
  router.use('/auth', authRouter(express, controllers.AuthController))

  router.get('/path', middleware.authenticate, (req, res) =>
    res.status(200).json({ status: 'success' })
  )

  router.get('/', (req, res, next) => {
    res.status(200).json({ status: 'success' })
  })
  return router
}

module.exports = router
