const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        documentType: {
            type: String,
            enum: ['CC', 'CE', 'TI']
        },
        documentNumber: {
            type: Number
        }
    },
    {
        versionKey: false,
        timestamps: true 
    }
)

module.exports = mongoose.model('user', UserScheme)