const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/')

module.exports = () => (req, res, next) => {
    const token = req.headers['X-Authorization'];

    try {
        if (token) {
            const userData = jwt.verify(token, SECRET)
            console.log(userData)
            req.user = userData;
        }
    } catch (err) {
        console.log(err.message)
    }
    next()
}
