const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const route = require('./route')

const app = express()

app.use(cors({origin:"*/*"}))

app.use(route)

const server = http.createServer(app)

const io = new Server(server, {
  cors:"*/*",
  methods:['GET',"POST"]
})

app.listen(5000,() => {
  console.log('server is running 5000');
})