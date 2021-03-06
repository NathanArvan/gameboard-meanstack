const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const Board = require('./models/Board')
const port = 3000

// Connection URI
const uri =
  "mongodb://localhost:27017/mean?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";


mongoose.connect(uri)
  .then(() => {
    const app = express()
    app.use(cors());

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    app.use(express.json()) // new

    app.get('/boards', async (req, res) => {
      console.log('hit route')
      const boards = await Board.find();
      console.log(boards);
      res.send(boards)
  })

    // console.log(routes)
    // //app.use('/api', routes)
    // console.log(app)


    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })



