const express = require("express");

const Document = require("../models/Country");
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get("/countries/all", (req, res, next) => {
  req.app.locals.db
    .collection("countries")
    .find({})
    .sort({name:1})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result === undefined || result.length === 0) {
        res.status(400).send({ error: "No documents in database" });
      } else {
        res.status(200).send(result);
      }
    });
});

router.get("/countries/allNameOnly", (req, res, next) => {
  req.app.locals.db
    .collection("countries")
    .find({})
    .project({name:1})
    .sort({name:1})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result === undefined || result.length === 0) {
        res.status(400).send({ error: "No documents in database" });
      } else {
        res.status(200).send(result);
      }
    });
});

router.get("/countries/:id", (req, res, next) => {
  req.app.locals.db.collection("countries").findOne(
    {
      _id: ObjectID(req.params.id)
    },
    (err, result) => {
      console.log(result);
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result == undefined) {
        res
          .status(400)
          .send({ error: "No document matching that id was found" });
      } else {
        console.log(result);
        res.status(200).send(result);
      }
    }
  );
});

router.post("/countries/new/:name", (req, res, next) => {

console.log(req.params.name);
  req.app.locals.db.collection("countries").findOne(
    {
      name: {$regex : new RegExp("^"+req.params.name+"$","i")}
    },
    (err, result) => {
      console.log('result');
      console.log(result);
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result == undefined) {
        console.log('new');
      //console.log(result);
        const newDocument = new Document(
          req.body.name,
          req.body.capital,
          req.body.population,
          req.body.languages,
          req.body.latitude,
          req.body.longitude,
          req.body.cur,
          req.body.flag
        );
        req.app.locals.db.collection("countries").insertOne(
          {
            
              name: newDocument.name,
              capital: newDocument.capital,
              population: newDocument.population,
              languages: newDocument.languages,
              location: newDocument.location,
              currency: newDocument.cur,
              flag: newDocument.flag
            
          },
          (err, result) => {
            if (err) {
              res.status(400).send({ error: err });
            }
            console.log(result);
            res.status(200).send(result);
          }
        );
      } else {
        console.log(result);
        res.status(403).send('Already exists');
      }
    }
  );
});

/* router.post("/countries/new", (req, res, next) => {
 
  const newDocument = new Document(
    req.body.name,
    req.body.capital,
    req.body.population,
    req.body.languages,
    req.body.latitude,
    req.body.longitude,
    req.body.cur,
    req.body.flag
  );
  req.app.locals.db.collection("countries").insertOne(
    {
      
        name: newDocument.name,
        capital: newDocument.capital,
        population: newDocument.population,
        languages: newDocument.languages,
        location: newDocument.location,
        currency: newDocument.currency,
        flag: newDocument.flag
      
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).send(result);
    }
  );
}); */

router.delete("/countries/delete/:id", (req, res, next) => {
  req.app.locals.db.collection("countries").deleteOne(
    {
      _id: ObjectID(req.params.id)
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).send(result);
    }
  );
});

router.patch("/countries/edit/:id", (req, res, next) => {
  req.app.locals.db.collection("countries").updateOne(
    {
      _id: ObjectID(req.params.id)
    },
    {
      $set: {
        'name': req.body.name,
        'capital': req.body.capital,
        'population': req.body.population,
        'languages': new Array(req.body.languages),
        'location.latitude': req.body.latitude,
        'location.longitude': req.body.longitude,
        'currency': req.body.cur,
        'flag': req.body.flag
      }
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).send(result);
    }
  );
});

module.exports = router;
