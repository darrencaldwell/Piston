//const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose")
const express = require("express")
const app = express();

const url = "mongodb://mongodb:27017/piston_cards";
const port = 21450
const Schema = mongoose.Schema;


const cardSchema = new mongoose.Schema({
  card: [{
    version: String,
    data: Schema.Types.Mixed
  }]
});

const Card = mongoose.model('Card', cardSchema);

const testCard = new Card({
  card: [
    {
    version: "1.0",
    data: {
      name: "test",
      description: "card thats really good",
      repairCost: "a lot",
      scrapValue: "not a lot",
      credit_value: 666,
      type: "Mechanism",
      lastEditor: "darren",
      dateModified: new Date()
    }
  },
  {
    version: "1.1",
    data: {
      name: "test",
      description: "card thats really good",
      repairCost: "a lot",
      scrapValue: "not a lot",
      credit_value: 666,
      type: "Mechanism",
      lastEditor: "darren",
      dateModified: new Date()
    }
  }
  ]
})

app.get("/", function (req, res) {
  const date: Date = new Date();
  res.send(`ping pong the date is ${date}`)
})


app.get("/add", function (req, res) {

  testCard.save((err, testCard) => {
    if (err) res.send(err)
    else res.send(`added: \n${testCard}`)
  })

})


app.get("/card", (req, res) => {
  Card.find((err, cards) => {
    if (err) res.send(err)
    else res.send(cards)
  })
})


mongoose.connect(url, {useUnifiedTopology: true})
const db = mongoose.connection;

// on error output log it and end
db.on("error", console.error.bind(console, "connection error:"));

// otherwise begin listening 
db.once("open", async () => {
  app.listen(port, () => {
    console.log("Cards service is now up and running...")
  })
})


