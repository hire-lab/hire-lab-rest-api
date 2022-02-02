const router = require('express').Router();
const interviewService = require('../services/interviewService');

router.get('/', async(req, res) => {
    try {
        const jobId = req.params.id;
        const interviews = await interviewService.getInterviewsByJobId(jobId);
        res.json(interviews)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

module.exports = router;
