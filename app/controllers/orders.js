const { handleHttpError } = require('../utils/handleError')
const orderModel = require('../models/orders')
const { default: mongoose } = require('mongoose')

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
