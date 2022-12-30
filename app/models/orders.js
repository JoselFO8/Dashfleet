const mongoose = require('mongoose')

const OrderScheme = new mongoose.Schema(
    {
        orderCode: {
            type: mongoose.Types.ObjectId
        },
        clientId: {
            type: mongoose.Types.ObjectId
        },
        deliveryAddress: {
            type: String,
        },
        products: {
            type: Array
        },
        deliveryStatus: {
            type: String,
            enum: ['received', 'in process', 'finished']
        },
        deliverDate: {
            type: Date
        },
    },
    {
        versionKey: false,
        timestamps: true 
    }
)

module.exports = mongoose.model('order', OrderScheme)