const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const companyId = req.params.id;
    let formattedDate = req.query.date.split(' ').slice(0, 4). join(' ');

    try {
        let interviews = await req.interviewStorage.getAll(companyId, formattedDate);
        res.json(interviews)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    const interviewData = {
        jobId: req.body.jobId,
        candidateId: req.body.candidateId,
        date: req.body.date,
        time: req.body.time
    }

    try {
        const result = await req.interviewStorage.bookInterview(interviewData)
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

module.exports = router;

