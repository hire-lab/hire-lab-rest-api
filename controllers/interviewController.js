const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const filter = req.query;
        const interviews = await req.interviewStorage.getAll(filter);
        res.json(interviews)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    const interviewData = {
        job: req.body.jobId,
        potentialCandidates: req.body.candidateId,
        jobTitle: req.body.jobTitle,
        candidateName: req.body.candidateName
    }

    try {
        const result = await req.interviewStorage.bookInterview(interviewData)
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

/*router.get('/:id', async (req, res) => {
    const interviews = await req.interviewStorage.getInterviewsByJobId();
    res.json(interviews)
})*/

module.exports = router;

