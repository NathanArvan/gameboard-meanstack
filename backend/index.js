const express = require('express');
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const tokenRoute = require('./routes/token.routes')
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());


// Make Images "Uploads" Folder Publicly Available
app.use('/public', express.static('public'));


// API Route
app.use('/api', tokenRoute)


// Connection URI
const uri =
  "mongodb://localhost:27017/mean?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

  // Create a new MongoClient
//const client = new MongoClient(uri);

async function run() {
try {
    // Connect the client to the server
    //await client.connect();
    // Establish and verify connection
    //await client.db("admin").command({ ping: 1 });
    await mongoose.connect(uri);
    console.log("Connected successfully to server");
} finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
    await mongoose.disconnect();
}
}

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
    run().catch(console.dir);
  console.log(`Example app listening on port ${port}`)
})