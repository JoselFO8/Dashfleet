const express = require('express')
const { getAllUsers, getUserByID, createUser } = require("../controllers/users")
const { ValidatorInserData } = require('../validators/users')
const router = express.Router()

// router.get("/user-order", validateUserInOrder)

/**
 * Obtener todos los usuarios
 * Route> /user
 */
router.get("/", getAllUsers)

/**
 * Obtener un usuario por su id
 * Route> /user/:id
 */
router.get("/:id", getUserByID)

/**
 * Create user
 * Route> /user
 */
router.post("/", ValidatorInserData, createUser)

module.exports = router