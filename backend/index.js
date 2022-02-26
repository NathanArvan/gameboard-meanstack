const express = require('express');
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const tokenRoute = require('./routes/token.routes')
const routes = require('./routes/routes')
const port = 3000

// Connection URI
const uri =
  "mongodb://localhost:27017/mean?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";


mongoose.connect(uri)
  .then(() => {
    const app = express()
    app.use(cors());

    
    // app.use(express.json({limit: '20mb'}));
    // app.use(express.urlencoded({limit: '20mb'}));
    app.use(bodyParser.json({limit: '20mb'}));

    app.use(bodyParser.urlencoded({
      extended: false,
      limit: '20mb'
    }));

    // Make Images "Uploads" Folder Publicly Available
    app.use('/public', express.static('public'));

    // API Route
    app.use('/api/tokens', tokenRoute)
    app.use('/api', routes)

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })



