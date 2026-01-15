const http = require('http')
const express = require('express')
const path = require('path')

const port = 3000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) =>  {
    res.redirect('./index.html')
})

const server = http.createServer(app)

server.listen(port, () =>  {
    console.log(`Server hosting on port ${port}`)
})