const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/')

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    try {
        if (token) {
            const userData = jwt.verify(token, SECRET)
            req.user = userData;
        }
    } catch (err) {
        console.log(err.message)
    }
    next()
}