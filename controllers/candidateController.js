const router = require('express').Router();
const preloadCandidate = require('../middlewares/preloadCandidate')

router.get('/', async (req, res) => {
    const candidates = await req.candidateStorage.getAll();
    res.json(candidates)
})

router.get('/:id', preloadCandidate(), (req, res) => {
    const candidate = req.data;
    res.json(candidate)
})

router.post('/', async(req, res) => {
    const candidateData = {
        name: req.body.name,
        email: req.body.email
    }

    try {
        const result = await req.candidateStorage.create(candidateData)
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.get('/:id/interviews', preloadCandidate(), (req, res) => {
    const candidate = req.data;
    res.json(candidate)
})

router.post('/:id/interviews', async (req, res) => {
    try {
        console.log('jobId: ', jobId)
        console.log('candidate id: ', candidateId)
        const result = await req.interviewStorage.bookInterview(jobId, candidateId);
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

module.exports = router;