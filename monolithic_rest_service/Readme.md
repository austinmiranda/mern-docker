# Monolithic API Instructions

Make sure the persistence layer is running (backend floder).

```
docker run -it --name my-mongo \
    -p 27017:27017 \
	<your username>/earth_db
```

As you'll recall, this runs a container from an image we made previously, opens up port 27017 so we can access the service from our host.

Our express-based service will be composed of three parts - the server, the routes, and the models.

## Writing the Server

We will create this server across three files, starting with the index.js.

By now, you'll be quite familiar with using npm to initialize a project:

`npm init`

Then we can create two folders, "routes" and "models"

```
mkdir routes
mkdir models
```

Next we can get started on our server.

`touch index.js`

When we "dockerize" this application, we will be using environmental variables for connecting to the mongodb database, but for now we can just include the user/password in the URL.

```
const dbName =
  process.env.NODE_ENV === "dev" ? "database-test" : "192.168.99.100";

/*const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
  process.env.MONGO_INITDB_ROOT_PASSWORD
}@${dbName}:27017`;*/

const url = `mongodb://admin:secret@${dbName}:27017`;
```

Express is a popular module that provides a wide array of convenience functions for receiving and replying to HTTP requests. To create an API, the express module needs to be provided configuration information for "middleware".

### About Middleware

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

_Middleware functions_ can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

Middleware can be used at different levels of the request-handling stack. There is application-level middleware, router-level middleware, error-handling middlware and a variety of others.

In our server, we will use a variety of application-level middleware to perform basic transforms on all requests coming in to the server.

**Bodyparser** parses the body of incoming requests to make them easier to work with in routes.

Since we are working with a JSON-based service, we will use bodyparser to parse the request to JSON. (It can also be used to parse plain text and raw, or buffer)

`app.use(bodyParser.json());`

We can also use the "urlencoded" option, which ensures that the request will only be parsed where the Content-Type header matches the type option (in this case JSON). The parser also has build in features to gzip and deflate requests.

**Routes** are middleware that we create ourselves, which are used to determine the queries to run against the database.

And lastly it is typically good practice to create a simple middleware that can go at the end of our request handling, that will serve up a "404" error or a redirect if all of our other middleware in the stack shoud fail.

Our middleware setup looks like this:

```
const app = express();
const http = require("http").Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);
app.use((req, res) => {
  res.status(404);
});
```

Once the middleware is configured, we are free to do our connection to the database, then start listening at our API server, which is now configured to handle requests.

```
MongoClient.connect(url, options, (err, database) => {
  if (err) {
    console.log(`FATAL MONGODB CONNECTION ERROR: ${err}:${err.stack}`);
    process.exit(1);
  }
  app.locals.db = database.db("leaflet");
  http.listen(port, () => {
    console.log("Listening on port " + port);
    app.emit("APP_STARTED");
  });
});
```

Notable in the code above is the `app.locals`. This is simply an object that gets attached as a convenience to the root level of the app. This is used in the routes of the application.

### Creating Routes

Routes are an application-level middleware that get executed every time the application receives a request.

Express includes a "Router" module that can be used to create modular, mountable route handlers. It is a complete middleware and routing system, that can be stacked along with other middleware.

**Body and Params**

Because of the way we have configured our application-level middleware, when the requests arrives at the router it's request body would have already been identified as JSON and parsed. This allows the route handler to look at the contents of the request, which is contained in the "body" object.

Additionally, the route handler can receive values through the URL fragment of the request. These are denoted by a `:` in the url, followed by a variable name. These values are samed into an object called "params".

In the following fragment, an country id is denoted by the `/:id` part of the URL:

`"/countries/:id"`

This can be accessed in the route handler function like so:

`req.params.id`

Let's look at a full example that queries the database for an country by id.

```
router.get("/countries/:id", (req, res, next) => {
  req.app.locals.db.collection("countries").findOne(
    {
      _id: req.params.id
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result === undefined) {
        res
          .status(400)
          .send({ error: "No document matching that id was found" });
      } else {
        res.status(200).send(result);
      }
    }
  );
});
```

Besides retrieving data, we will also want to push new data into the database, or update existing documents. We can do this directly, but we might also want to use a model (that we'll be able to apply validation to later)

### Creating Models

Javascript has classes now! Well in reality they are just fancy wrappers to the "prototype" object that has always been in Javascript, but we can make good use of them here.

```
module.exports = class Document {
  constructor(title, username, body) {
    this.title = title;
    this.username = username;
    this.body = body;
  }
};
```

Nothing fancy to see here, just an object with some properties. If we were to go further with the example, we would likely use a tool like Joi to perform validation on the data.

## Dockerizing the Application

The last step of the process would be to dockerize the API by wrapping up the API in an image that can be used to launch containers.
This part of the process would be very similar to how we did things in the previous week when we dockerized the microservice API.

### Build and Run

From the directory of your dockerfile:

```
$ docker build -t <your username>/mono_api .
```

Once built, we can feel free to launch a container from the image.

```
$ docker run --link my-mongo:my-mongo -p 80:80 -d <your username>/mono_api
```

Now you can hit the API in your browser!

`http://192.168.99.100/api/countries/all`
