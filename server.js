const express = require('express')
const initWebRoutes = require('./routes')
const cors = require('cors')
const DB = require('./connectDB')

require('dotenv').config()

const app = express()
const port = 8888
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
initWebRoutes(app)

app.listen(port, (err) => {
    if (!err) {
        console.log('Server is running on the port: ' + port)
        DB()
    } else {
        console.log('Server not fine')
    }
})