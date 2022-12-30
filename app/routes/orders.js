const express = require('express')
const {getAllOrders, getOrderByID, createOrder, ordersUser} = require("../controllers/orders")
const { ValidatorInserData } = require('../validators/orders')
const router = express.Router()

/**
 * 
 */
router.get("/prueba", ordersUser)

/**
 * Obtener todos los pedidos
 * Route> /order
 */
router.get("/", getAllOrders)

/**
 * Obtener un usuario por su id
 * Route> /order/:id
 */
router.get("/:id", getOrderByID)

/**
 * Crear pedido
 * Route> /order
 */
router.post("/", ValidatorInserData, createOrder)



module.exports = router