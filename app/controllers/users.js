const { handleHttpError } = require('../utils/handleError')
const userModel = require('../models/user')

/**
 * Obtener data de todos los usuarios
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers = async (req, res) => {    
    try {
        const data = await  userModel.find({})
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_GET_USERS")
    }
}

/**
 * Obtener un usuario por su id
 * @param {*} req 
 * @param {*} res 
 */
exports.getUserByID = async (req, res) => {
    try {
        const {id} = req.params
        const data = await userModel.findById(id)
        res.send(data)
    } catch (error) {
        res.status(400).send("ERROR_GET_USER_BY_ID", error)
    }    
}

/**
 * Insertar data de usuarios
 * @param {*} req 
 * @param {*} res 
 */
exports.createUser = async (req, res) => {
    try {
        const dataUser = req.body
        const data = await userModel.create(dataUser)
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_USER")
    }
}
