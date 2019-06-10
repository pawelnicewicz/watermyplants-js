// *******************************************************************
//                          DEPENDENCIES
// *******************************************************************
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')

const errors = require('./libs/errors')
const router = require('./routers/router')

// *******************************************************************
//                    EXPRESS.JS CONFIGURATION
// *******************************************************************
dotenv.config()
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use((req, res, next) => {
//   if (req.secure) {
//     next()
//   } else {
//     res.redirect('https://' + req.headers.host + req.url)
//   }
// })

// *******************************************************************
//                     AUTH CONFIGURATION
// *******************************************************************
app.use(passport.initialize())
require('./libs/passport')(passport)

// *******************************************************************
//                     DATABASE CONFIGURATION
// *******************************************************************
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_URL)
mongoose.connection.on('open', () => {
  console.log('connection to database done!')
})
mongoose.connection.on('error', error => {
  console.log('error', error)
})

// *******************************************************************
//                           ROUTING
// *******************************************************************
app.use('/', router(express, passport, errors))

// *******************************************************************
//                           LISTENER
// *******************************************************************
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(
    `The watermyplants-js server has started at ${process.env.IP}:${
      process.env.PORT
    }!`
  )
})
