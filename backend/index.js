const express = require('express')
const { MongoClient } = require("mongodb");
const app = express()
const port = 3000

// Connection URI
const uri =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

  // Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    run().catch(console.dir);
  console.log(`Example app listening on port ${port}`)
})