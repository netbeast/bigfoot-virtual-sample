const express = require('express')
const request = require('superagent')
const colorsys = require('colorsys')
const router = express.Router()

const bulbState = {
  power: 0,
  color: '#ffffff'
}

module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('ws:// bulb has connected to plugin')

    socket.on('params', function (params) {
      console.log('ws://params', params)
      bulbParams = params
    })
  })

  io.on('disconnection', function () {
    console.log('ws:// bulb has disconnected from plugin')
  })

  io.on('connect_failure', function (err) {
    console.log('ws:// connection failure')
    console.log(err)
  })

  router.post('/', function (req, res) {
    io.emit('get')
    console.log('POST Request', req.body)
    io.emit('set', req.body.state)
    res.send('OK')
  })

  router.get('/', function (req, res) {
    io.emit('get')
    setTimeout(function () {
      if (bulbParams) {
        console.log('GET Response', bulbState)
        return res.json(bulbState)
      } else {
        res.status(404).json('Device not found')
      }
    }, 3000)
  })


  return router
}

function _parseKeyPost (key, value) {
  if (key === 'hue') value > 65535 ? 65535 : value
  if (key === 'saturation' || key === 'brightness') value > 255 ? 255 : value
  value === 0 ? 0 : value
  return value
}
