const { handleHttpError } = require('../utils/handleError')
const { default: mongoose } = require('mongoose')
const orderModel = require('../models/orders')
const userModel = require('../models/user')

/**
 * Obtener DATA de todos los pedidos
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllOrders = async (req, res) => {    
    try {
        const data = await orderModel.find({})
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ORDERS")
    }
}

/**
 * Obtener un pedido con informacion de usuario
 * Pasar por body el codigo de pedido
 * @param {*} req 
 * @param {*} res 
 */
exports.ordersUser = async (req, res) => {
    try {
        const {orderCode} = req.body
        const data = await orderModel.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "clientId",
                        foreignField: "_id",
                        as: "userInfo"
                    }
                },
                { $unwind: "$userInfo" },
                { $match: { _id: mongoose.Types.ObjectId(orderCode) } }
            ]
        )
        res.send(data)
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_GET_ORDER_USER")
    }
}

/**
 * Validar si el numero pedido coincide con el usuario
 * Pasar por body codigo de pedido, tipo de documento y numero de documento  
 * @param {*} req 
 * @param {*} res 
 */
exports.validateUserInOrder = async (req, res) => {
    try {
        const {orderCode, documentType, documentNumber} = req.body
        const idUser = await userModel.findOne({documentType, documentNumber})
        const data = await orderModel.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "clientId",
                        foreignField: "_id",
                        as: "userInfo"
                    }
                },
                { $unwind: "$userInfo" },
                { $match: { _id: mongoose.Types.ObjectId(orderCode), clientId: mongoose.Types.ObjectId(idUser._id) } }
            ]
        )
        if(idUser && data) {
            if(data.length > 0) {
                res.send(true)
            }
            else {
                throw new Error('NOT_FOUND')
            }
        }
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_GET_ORDER_USER")
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
        handleHttpError(res, "ERROR_GET_ORDERS_BY_ID")
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
        dataOrder['orderCode'] = new mongoose.Types.ObjectId()
        const data = await orderModel.create(dataOrder)
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ORDER")
    }
}
