//const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Validator = require("jsonschema").Validator;
const app = express();

const jsonParser = bodyParser.json();
var validator = new Validator(); 

const url = "mongodb://mongodb:27017/piston_cards";
const port = 21450;
const Schema = mongoose.Schema;

var cardValidator = {
  "id": "/Card",
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "description": {"type": "string"},
    "repairCost": {"type": "string"},
    "scrapValue": {"type": "string"},
    "creditValue": {"type": "number"},
    "cardType": {"type": "string"},
    "lastEditor": {"type": "string"}
  },
  "required": ["name", "description", "repairCost", "scrapValue", "creditValue", "cardType", "lastEditor"]
}

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


app.get("/cards/all", (req, res) => {
  Card.find((err, cards) => {
    if (err) res.send(err)
    else res.send(cards)
  })
})


app.post("/cards/new", jsonParser, (req, res) => {
  const validation = validator.validate(req.body, cardValidator)
  // if any errors in the json from the schema defined 
  if (validation.errors.length) {
    var errString: string = ""
    validation.errors.forEach(arr => {errString += arr.message + "\n"})
    res.send(errString);
  }
  // add to database
  else {
    const newCard = new Card ({
        card: [
          {
          version: "1.0",
          data: {
            name: req.body.name,
            description: req.body.description,
            repairCost: req.body.repairCost,
            scrapValue: req.body.scrapValue,
            creditValue: req.body.creditValue,
            type: req.body.cardType,
            lastEditor: req.body.lastEditor,
            dateModified: new Date()
          }
        }
      ]
    })
    newCard.save((err, newCard) => {
      if (err) res.send(err)
      else res.send(`added: \n${newCard}`)
    })
  }
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


