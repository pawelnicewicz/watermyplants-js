const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

class AuthService {
  constructor (errors) {
    this.errors = errors
  }

  async registerUser (email, password) {
    const user = await User.findOne({ email })
    if (user) throw new this.errors.ValidationError('user already exists')
    const newUser = new User({
      email,
      password
    })
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(newUser.password, salt)
      newUser.password = hash
      await newUser.save()
      return newUser
    } catch (exception) {
      throw new this.errors.InternalError(exception)
    }
  }

  async loginUser (email, password) {
    const user = await User.findOne({ email })
    if (!user) throw new this.errors.ValidationError('user not found')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new this.errors.ValidationError('password incorrect')
    try {
      const payload = {
        id: user._id,
        name: user.userName
      }
      const token = await jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: 36000
      })
      return token
    } catch (exception) {
      throw new this.errors.InternalError()
    }
  }
}

module.exports = AuthService
