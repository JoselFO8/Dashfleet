const express = require('express')
const {getAllOrders, getOrderByID, createOrder} = require("../controllers/orders")
const { ValidatorInserData } = require('../validators/orders')
const router = express.Router()

/**
 * Get All Order
 * Route> /order
 */
router.get("/", getAllOrders)

/**
 * Get Order by id
 * Route> /order
 */
router.get("/:id", getOrderByID)

/**
 * Create order
 * Route> /order
 */
router.post("/", ValidatorInserData, createOrder)

module.exports = router