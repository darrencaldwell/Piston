const MongoClient = require("mongodb").MongoClient;
const express = require("express")

const app = express();

const url = "mongodb://mongodb:27017";
const dbName = "piston"
const client = new MongoClient(url)
const port = 21450

MongoClient.connect(url, {useUnifiedTopology : true}, function (err, client) {
  if (err) throw err

  var db = client.db(dbName)
  console.log("Connected to database")
})

app.get("/", function (req, res) {
  res.send("ping pong")
})

app.listen(port, () => {
  console.log("Cards service is now up and running...")
})
