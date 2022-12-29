const express = require("express");
const fs = require("fs");

const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
    return fileName.split('.').shift() 
}

router.get('/', (req, res) => {
    res.status(200).send('Conexion correcta!');
});

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file) // TODO users, items, uploads
    if(name !== 'index') {
        router.use(`/${name}`, require(`./${file}`)) // TODO http://localhost:3001/user
    } 
})

module.exports = router