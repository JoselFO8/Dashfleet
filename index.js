require("dotenv").config()
const cors = require("cors")
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dbConnect = require('./config/db.js')

// Initializations
const app = express()

// Settings
const port = process.env.PORT || 4000

// Midlewares server 
app.use(cors()) // Para dar permisos a algunas URL's
app.use(morgan('dev'));

// for parsing json
app.use( 
    bodyParser.json({
        limit: '20mb'
    })
)

// for parsing appication/x-www-form-urlencoded
app.use( 
    bodyParser.urlencoded({
        limit: '20mb', 
        extended: true
    })
)
app.use(express.json())
app.use("/", require("./app/routes"))

// Test de inicio 
app.get("/", (req, res) => {
    res.send("Test de inicio Video Tube")
})

// Start the server
app.listen(port, () => {
    console.log(`La aplicacion esta corriendo en el puerto ${port}`);
})

dbConnect();
