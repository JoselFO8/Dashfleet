const { default: mongoose } = require('mongoose')
const orderModel = require('../models/orders.js')
const { handleHttpError } = require('../utils/handleError.js')

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
 * Obtener DATA de todos los usuarios
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllOrders = async (req, res) => {    
    try {
        const data = await orderModel.paginate({}, options, (error, docs) => {
            res.send({
                orders: docs.docs,
            })
        })
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ORDERS")
    }
}

/**
 * Obtener un usuario por su id
 * @param {*} req 
 * @param {*} res 
 */
exports.getOrderByID = async (req, res) => {
    try {
        const {id} = req.params
        const data = await orderModel.findById(id)
        res.send({Order: data})    
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ORDERS_BY_ID")
    }    
}

/**
 * Insertar DATA de usuarios
 * @param {*} req 
 * @param {*} res 
 */
exports.createOrder = async (req, res) => {
    try {
        const dataOrder = req.body
        const data = await orderModel.create(dataOrder)
        res.send({data})  
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ORDER")
    }
}

/**
 * Actualizar un user por ID
 * @param {*} req 
 * @param {*} res 
 */
exports.updateOrder = (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        orderModel.updateOne(
            { _id: parseId(id)},
            body, // Segundo argumento, se indican datos a actualizar
            (error, docs) => {
                res.send({
                    items: docs
                })
            }
        )
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_ORDER")
    }    
}

/**
 *  Borrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteOrder = (req, res) => {
    try {
        const { id } = req.params
        orderModel.deleteOne(
            { _id: parseId(id)},
            (error, docs) => {
                res.send({
                    items: docs
                })
            }
        )   
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ORDER")
    }
}

