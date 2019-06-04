const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const dbName = process.env.NODE_ENV === "prod" ? "my-mongo" : "192.168.99.100";

 const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
  process.env.MONGO_INITDB_ROOT_PASSWORD
}@${dbName}:27017`;
 
 //const url = `mongodb://admin:secret@${dbName}:27017`;

const options = {
  useNewUrlParser: true,
  reconnectTries: 60,
  reconnectInterval: 1000
};
const routes = require("./routes/routes.js");
const port = process.env.PORT || 80;
const app = express();
app.use(cors());
const http = require("http").Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);
app.use((req, res) => {
  res.status(404);
});

const persistentConnect = () => {
  MongoClient.connect(
    url,
    options,
    (err, database) => {
      if (err) {
        console.log(`FATAL MONGODB CONNECTION ERROR: ${err}`);
        console.log(`FATAL MONGODB CONNECTION ERROR STACK: ${err.stack}`);
        setTimeout(persistentConnect, 5000);
      } else {
        app.locals.db = database.db("earth");
        http.listen(port, () => {
          console.log("CORS enabled Listening on port " + port);
          app.emit("APP_STARTED");
        });
      }
    }
  );
};
persistentConnect();

module.exports = app;
