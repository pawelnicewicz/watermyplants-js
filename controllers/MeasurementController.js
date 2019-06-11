class MeasurementController {
  constructor (services, errors) {
    this.MeasurementService = services.MeasurementService
    this.errors = errors
  }

  async collectMeasurement (req, res) {
    const measurementData = {
      temperature: parseFloat(req.body.temperature),
      humidity: parseFloat(req.body.humidity),
      moisture: parseFloat(req.body.moisture),
      source: String(req.body.source)
    }
    try {
      const measurement = await this.MeasurementService.collectMeasurement(
        measurementData
      )
      res.status(200).send(measurement)
    } catch (exception) {
      console.log(exception)
      res.status(500).send('error')
    }
  }

  async showChart (req, res) {
    try {
      const measurements = await this.MeasurementService.getMeasurements(10)
      res.status(200).send(measurements)
    } catch (exception) {
      console.log(exception)
      res.status(500).send('error')
    }
  }
}

module.exports = MeasurementController
