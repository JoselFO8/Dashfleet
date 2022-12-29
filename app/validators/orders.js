const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators.js")

// Midelware - Validacion de datos

const ValidatorInserData = [
    check("clientName").exists().notEmpty().isLength({min: 3, max: 25}),
    check("deliveryAddress").exists().notEmpty(),
    check("deliveryStatus").exists().notEmpty(),
    check("deliverDate").exists().notEmpty(),
 
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {ValidatorInserData}