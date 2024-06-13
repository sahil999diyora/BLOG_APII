var jwt = require('jsonwebtoken');
var USER = require('../models/user');

exports.SECURE = async function (req, res, next) {
    try {

        // TOKEN

        let token = req.headers.authorization ;
        
        if (!token) {
            throw new Error(" PLESE ATTECH TOKEN ! ")
        }

        let DATA = await jwt.verify(token, 'SURAT')
        
        let USERCHEAK = await USER.findById(DATA.userId)

        if(!USERCHEAK)
        {
            throw new Error("USER OR ONVALID TOKEN FOUND !")
        }

        next()

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}