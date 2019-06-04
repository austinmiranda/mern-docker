## Back End Services

The back-end runs in a docker container and consists of mongodb. Included here are instructions for starting up the mongo container, and running a script to insert sample data. (This builds upon our work from week3)

In our in-class example, we use a simple node application to insert sample data into a running mongo container. In this practical example we do something similar, but use a built-in feature of the mongo container to automate this into a single step.

From the official mongo docs:

> When a container is started for the first time it will execute files with extensions .sh and .js that are found in /docker-entrypoint-initdb.d. Files will be executed in alphabetical order. .js files will be executed by mongo using the database specified by the MONGO_INITDB_DATABASE variable, if it is present, or test otherwise. You may also switch databases within the .js script.

Therefore, when we start this container we will include something to copy a configuration .js file into the /docker-entrypoint-initdb.d location.

We will:

1. Create the initialization script
2. Create a docker file to copy the script into the container
3. Build a docker image we can launch containers from
4. Launch our container with a name (for linking)

### Create the Initialization Script

There are a few things specific to our initialization script, that it gets from the container started via docker.

Notably, we don't need to specifically connect to a database in this script, since it will automatically be connected during startup, to a database specified by the MONGO_INITDB_DATABASE environment variable.

Having been already connected, we can simply begin to run queries on the database. This lets us insert our documents in collections.

`db.countries.insertMany(countryData);`

### Create the Dockerfile

Our dockerfile will set environment variables, and cause our initialization file to be copied into a specific location. Later, when the container is launched from this image, mongo will look to that location and run the script, which will set up our database.

```
FROM mongo:3.4.18-jessie

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD secret
ENV MONGO_INITDB_DATABASE earth

EXPOSE 27017

ADD mongo-init.js /docker-entrypoint-initdb.d/
```

### Build the Docker Image

From the directory of your dockerfile:

```
$ docker build -t <your username>/earth_db .
```

### Start the Mongo Container with Dockerfile

```
docker run -it --name my-mongo \
    -p 27017:27017 \
	<your username>/earth_db
```

Just like that, you'll see your container launching, and the output will show you documents getting inserted into the database. It will end with the indication that the app is awaiting connections.

### Testing with Node

In this same directory, we can find a node application that can be run any time we wish to reset our database back to a clean state with the sample data. (Remember, our initialization script is only run once by mongo at startup) It is as easy as this:

`node country_sampledata.js`

Note that this node application is able to connect because the user/password combination are included in the URL for the connection.
