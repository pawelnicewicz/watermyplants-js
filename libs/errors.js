class DomainError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class NotFoundError extends DomainError {
  constructor (additionalInfo) {
    super('NotFoundError')
    this.additionalInfo = additionalInfo
  }
}

class ValidationError extends DomainError {
  constructor (additionalInfo) {
    super('ValidationError')
    this.additionalInfo = additionalInfo
  }
}

class InternalError extends DomainError {
  constructor (error) {
    super(error.message)
    this.additionalInfo = { error }
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  InternalError
}
