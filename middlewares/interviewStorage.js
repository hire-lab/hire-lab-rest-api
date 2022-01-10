const interviewService = require('../services/interviewService');

module.exports = () => (req, res, next) => {
    req.interviewStorage = {
        ...interviewService
    }
    next()
}