const express = require('express')

const router = express.Router()

router.get("/", (req, res) => {
    res.send('desde Orders')
})

module.exports = router