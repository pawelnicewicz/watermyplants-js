const Measurement = require('../models/measurementModel')

class MeasurementService {
  constructor (errors) {
    this.errors = errors
  }

  async collectMeasurement (measurementData) {
    const newMeasurement = new Measurement(measurementData)
    try {
      const measurement = await newMeasurement.save()
      return measurement
    } catch (exception) {
      throw new this.errors.InternalError(exception)
    }
  }

  async getMeasurements (limit) {
    try {
      const measurements = await Measurement.find()
        .limit(limit)
        .sort({ $natural: -1 })
      const measurementsDates = measurements.map(measurement => {
        return Object.assign({}, measurement._doc, {
          date: measurement._id.getTimestamp()
        })
      })
      console.log(measurementsDates)
      return measurementsDates
    } catch (exception) {
      throw new this.errors.InternalError(exception)
    }
  }
}

module.exports = MeasurementService
