#!/usr/bin/env node

/* Requires node.js libraries */
const io = require('socket.io')()
const express = require('express')
const bodyParser = require('body-parser')
const Ssdp = require('node-ssdp')
const ip = require('ip')

const app = express()

// Netbeast apps need to accept the port to be launched by parameters
const argv = require('minimist')(process.argv.slice(2))

app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/api', require('./plugin')(io))

const server = app.listen(argv.port || 31416, function () {
  const addr = ip.address()
  const port = server.address().port
  console.log(`Bigfoot virtual bulb listening at http://${addr}:${port}`)

  ssdpServer = new Ssdp.Server({
    location: `http://${addr}:${port}/api`,
    sourcePort: 1900,
  })
  ssdpServer.addUSN('bigfoot:bulb')
  ssdpServer.start()
})

// we need websockets to push updates to browser view
io.listen(server)
