const mongoose = require('mongoose')

var MeasurementSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  moisture: Number,
  source: String
})

module.exports = mongoose.model('Measurement', MeasurementSchema)
