const jobService = require('../services/jobService');

module.exports = () => (req, res, next) => {
    req.storage = {
        ...jobService
    }
    next()
}