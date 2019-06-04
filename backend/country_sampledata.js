const MongoClient = require("mongodb").MongoClient;
const DBName = "earth";

/*
Note:
This node application can be used to insert sample data into a running mongo container.
Alternatively, see the readme for an example of using a configuration script.

This example assumes mongo running in a Docker container, from a standard docker mongo image.
docker run --name my-mongo -it -p 27017:27017 mongo:3.4.18-jessie

Use 'docker-machine env' to figure out the IP of your host network, and be sure to forward port 27017
*/
//note authentication via url
//this should be replaced with environment variables (for security)
//also note that no database is specified in URL, which causes client to
//authenticate against admin database (as root in this case)
const url = `mongodb://admin:secret@192.168.99.100:27017`;
const countriesData =
   [ 
    {
        name: "Canada",
        capital: "Ottawa",
        population: 37242571,
        languages: ["English", "French"],
        location: {
            latitude: "56.1304 N",
            longitude: "106.3468 W"
        },
        currency: "CAD",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1024px-Flag_of_Canada_%28Pantone%29.svg.png"
    },  
    {
        name: "China",
        capital: "Beijing",
        population: 1403500365,
        languages: ["Standard Chinese"],
        location: {
            latitude: "35.486703 N",
            longitude: "101.901875 E"
        },
        currency: "CNY",
        flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg"
    },  
    {
        name: "India",
        capital: "New Delhi",
        population: 1324171354,
        languages: ["Hindi","English"],
        location: {
            latitude: "20.5937 N",
            longitude: "78.9629 E"
        },
        currency: "INR",
        flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
    },
    {
        name: "Japan",
        capital: "Tokyo",
        population: 126440000,
        languages: ["Japanese"],
        location: {
            latitude: "36.2048 N",
            longitude: "138.2529 E"
        },
        currency: "JPY",
        flag: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"
    },        
    {
        name: "Sweden",
        capital: "Stockholm",
        population: 10223505,
        languages: ["Swedish"],
        location: {
            latitude: "60.1282 N",
            longitude: "18.6435 E"
        },
        currency: "SEK",
        flag: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1024px-Flag_of_Sweden.svg.png"

    },
    {
        name: "United States of America",
        capital: "Washington, D.C.",
        population: 327167434,
        languages: ["English"],
        location: {
            latitude: "37.0902 N",
            longitude: "95.7129 W"
        },
        currency: "USD",
        flag: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
    }
   ];

//connect call returns a connection promise, which can be 'then' with a callback
let connection = null;

MongoClient.connect(url)
  .then(con => {
    // <- callback
    console.log("Connected");
    connection = con;
    return con.db("earth").dropDatabase();
  })
  .then(() => {
    return connection
      .db("earth")
      .collection("countries")
      .insertMany(countriesData)
      .then(out => console.log(out));
  })
  .then(() => connection.close())
  .catch(err => {
    //if anything fails in the stack above, it will be caught here, stack stops
    console.log(err); //check for authentication fail?
  });
