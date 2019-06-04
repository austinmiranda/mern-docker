///This configuration script is run once at startup
///in a mongo docker container

///See dockerfile for how this script is run:
/// COPY mongo-init.js /docker-entrypoint-initdb.d/
/// or...
/// ADD mongo-init.js /docker-entrypoint-initdb.d/

///The "earth" database is specified by MONGO_INITDB_DATABASE variable during launch.

//data samples
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

    }
   ];

///insert documents into collection in leaflet database
db.countries.insertMany(countriesData);
