const HTTPStatus = require("http-status")
const jwt = require('jsonwebtoken')
const { GetById } = require("./repository")
const {Cipher} = require('./constants')

const VerifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if(!authHeader) {
        res.status(HTTPStatus.UNAUTHORIZED).json({ message : "Unauthorised request"})
        return
    }
    const [prefix, token] = authHeader.split(" ")
    if (prefix !== 'Bearer') {
        res.status(HTTPStatus.FORBIDDEN).json({ message : "Unauthorised access"})
        return
    }
    try {
        const { id, role } = jwt.verify(token, Cipher)
        const user = await GetById(id)
        if (!user) {
            res.status(HTTPStatus.NOT_FOUND).json({ message : "User not found"})
            return
        }
        req.userid = id
        req.user = user
        req.userrole = role
        next()
    } catch (error) {
        res.status(HTTPStatus.UNAUTHORIZED).json({ message : "Invalid access"})
        return
    }
}

module.exports = VerifyToken
