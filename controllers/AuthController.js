class AuthController {
  constructor (services, errors) {
    this.AuthService = services.AuthService
    this.errors = errors
  }

  async registerUser (req, res) {
    const email = req.body.email
    const password = req.body.password
    console.log(this)
    try {
      const user = await this.AuthService.registerUser(email, password)
      res.status(200).send(user)
    } catch (exception) {
      console.log(exception)
      res.status(500).send('error')
    }
  }

  async loginUser (req, res) {
    const email = req.body.email
    const password = req.body.password
    try {
      const token = await this.AuthService.loginUser(email, password)
      res.status(200).send(token)
    } catch (exception) {
      console.log(exception)
      res.status(500).send('error')
    }
  }
}

module.exports = AuthController
