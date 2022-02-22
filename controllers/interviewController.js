const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const companyId = req.params.id
    try {
        const interviews = await req.interviewStorage.getAll(companyId);
        res.json(interviews)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    const interviewData = {
        jobId: req.body.jobId,
        candidateId: req.body.candidateId,
        companyId: req.body.companyId
    }

    try {
        const result = await req.interviewStorage.bookInterview(interviewData)
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

module.exports = router;

