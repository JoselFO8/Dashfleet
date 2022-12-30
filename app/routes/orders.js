const express = require('express')
const {getAllOrders, getOrderByID, createOrder, ordersUser, validateUserInOrder} = require("../controllers/orders")
const { ValidatorInserData } = require('../validators/orders')
const router = express.Router()

/**
 * Obtener pedido con informacion del usuario
 * Route> /order/order-user
 */
router.get("/order-user", ordersUser)

/**
 * Validar si existe un pedido con el documento del usuario
 * Route> /order/order-user
 */
router.get("/validate-user-order", validateUserInOrder)

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