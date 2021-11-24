const candidateService = require('../services/candidateService');

module.exports = () => (req, res, next) => {
    req.candidateStorage = {
        ...candidateService
    }
    next()
}