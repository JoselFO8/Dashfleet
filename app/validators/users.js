const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators.js")

// Midelware - Validacion de datos
const ValidatorInserData = [
    check("name").exists().notEmpty().isLength({min: 3, max: 25}),
    check("documentType").exists().notEmpty(),
    check("documentNumber").exists().notEmpty(),
 
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {ValidatorInserData}