const router = (express, AuthController) => {
  const router = express()
  router.post('/register', AuthController.registerUser.bind(AuthController))
  router.post('/login', AuthController.loginUser.bind(AuthController))
  return router
}

module.exports = router
