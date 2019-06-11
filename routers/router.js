const AuthController = require('../controllers/AuthController')
const AuthService = require('../services/AuthService')
const authRouter = require('./authRouter')

const MeasurementController = require('../controllers/MeasurementController')
const MeasurementService = require('../services/MeasurementService')
const measurementRouter = require('./measurementRouter')

const router = (express, passport, errors) => {
  const services = {
    AuthService: new AuthService(errors),
    MeasurementService: new MeasurementService(errors)
  }

  const controllers = {
    AuthController: new AuthController(services, errors),
    MeasurementController: new MeasurementController(services, errors)
  }

  const middleware = {
    authenticate: (req, res, next) => {
      passport.authenticate('jwt', { session: false })
      next()
    }
  }

  const router = express()
  router.use('/auth', authRouter(express, controllers.AuthController))
  router.use(
    '/measurements',
    measurementRouter(express, controllers.MeasurementController, middleware)
  )
  router.get('/path', middleware.authenticate, (req, res) =>
    res.status(200).json({ status: 'success' })
  )

  router.get('/', (req, res, next) => {
    res.status(200).json({ status: 'success' })
  })
  return router
}

module.exports = router
