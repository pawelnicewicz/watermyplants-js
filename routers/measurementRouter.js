const router = (express, MeasurementController, middleware) => {
  const router = express()
  router.post(
    '/collect',
    middleware.authenticate,
    MeasurementController.collectMeasurement.bind(MeasurementController)
  )
  router.get('/', MeasurementController.showChart.bind(MeasurementController))
  return router
}

module.exports = router
