const http = require('http')
const express = require('express')
const path = require('path')

const port = 3000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)

server(port, () =>  {
    console.log(`Server hosting on port ${port}`)
})