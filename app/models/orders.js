const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const OrderScheme = new mongoose.Schema(
    {
        clientName: {
            type: String
        },
        deliveryAddress: {
            type: String,
        },
        deliveryStatus: {
            type: String
        },
        deliverDate: {
            type: Date
        },
    },
    {
        versionKey: false,  // deshabilitar el __v que envia mongo por defecto 
        timestamps: true    // guarda por defecto fecha de creacion y fecha de actualizacion
    }
)

// Llamar al schema y aplicarle el plugin para que pagine // Configurar en controllers
UserScheme.plugin(mongoosePaginate) 

// al igual que en MySQL, al modelo se le debe poner nombre, en este caso 'user'
module.exports = mongoose.model('user', UserScheme)