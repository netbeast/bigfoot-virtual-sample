const express = require('express')
const request = require('superagent')
const colorsys = require('colorsys')
const router = express.Router()

const bulbState = {
  power: false,
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
    console.log('[POST REQUEST]', req.body)
    const params = JSON.parse(req.body.body)
    console.log('Sending to bulb...', params.state)
    io.emit('set', params.state)
    res.send(params.state)
  })

  router.get('/', function (req, res) {
    io.emit('get')
    setTimeout(function () {
      console.log('[GET REQUEST] Current state:', bulbState)
      return res.json(bulbState)
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
