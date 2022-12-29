require("dotenv").config()
const mongoose = require('mongoose')

const DB_URI = process.env.DB_URI

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            DB_URI,
            {
                keepAlive: true, 
                useNewUrlParser: true, 
                useUnifiedTopology: true
            },
            (error) => {
                if(error) {
                    console.log('DB: ERROR!!', error)
                }
                else {
                    console.log('DB Conexion correcta!!');
                }
            }
        )
    }

    connect();
}