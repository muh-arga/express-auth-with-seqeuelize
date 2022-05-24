const express = require('express')
const route = require('../routes')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api', route)

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

module.exports = app