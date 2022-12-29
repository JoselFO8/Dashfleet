const { send } = require('express/lib/response')
const { default: mongoose } = require('mongoose')
const orderModel = require('../models/orders')
const { handleHttpError } = require('../utils/handleError')
//const { handleHttpError } = require('../utils/handleError.js')

const options = {
    page: 1,
    limit: 10
}

/**
 * Metodo para transformar un string en un objeto (id 'en este caso') 
 */
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
}

/**
 * Obtener DATA de todos los pedidos
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllOrders = async (req, res) => {    
    try {
        // const data = await orderModel.paginate({}, options, (error, docs) => {
        //     res.send({
        //         orders: docs.docs,
        //     })
        // })
        const data = await orderModel.find({})
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ORDERS")
        //res.status(400).send("ERROR_GET_ALL_ORDERS", error)
    }
}

/**
 * Obtener un pedido por su id
 * @param {*} req 
 * @param {*} res 
 */
exports.getOrderByID = async (req, res) => {
    try {
        const {id} = req.params
        const data = await orderModel.findById(id)
        res.send({Order: data})    
    } catch (error) {
        //handleHttpError(res, "ERROR_GET_ORDERS_BY_ID")
        res.status(400).send("ERROR_GET_ORDERS_BY_ID", error)
    }    
}

/**
 * Insertar DATA de pedidos
 * @param {*} req 
 * @param {*} res 
 */
exports.createOrder = async (req, res) => {
    try {
        const dataOrder = req.body
        const data = await orderModel.create(dataOrder)
        console.log("Prueba", data, dataOrder)
        res.send({data})  
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ORDER")
        //res.status(400).send("ERROR_CREATE_ORDER", error)
    }
}



