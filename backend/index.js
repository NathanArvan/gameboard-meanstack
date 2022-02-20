const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const port = 3000

// Connection URI
const uri =
  "mongodb://localhost:27017/mean?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";


mongoose.connect(uri)
  .then(() => {
    const app = express()

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    app.use(express.json()) // new

    app.use('/api', routes)
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })



