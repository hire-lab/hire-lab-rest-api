const router = require('express').Router();
const preloadCandidate = require('../middlewares/preloadCandidate')

router.get('/', async (req, res) => {
    try {
        const candidates = await req.candidateStorage.getAll();
        res.json(candidates)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }

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

router.get('/:id', preloadCandidate(), (req, res) => {
    try {
        const candidate = req.data;
        res.json(candidate)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.put('/:id', preloadCandidate(), async (req, res) => {
    const updated = {
        name: req.body.name,
        email: req.body.email
    }

    try {
        const result = await req.candidateStorage.update(req.params.id, updated);
        res.json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.delete('/:id', preloadCandidate(), async (req, res) => {
    try {
        await req.candidateStorage.remove(req.params.id)
        res.status(204).end()
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

/*router.get('/:id/interviews', async (req, res) => {
    try {
        const candidateId = req.params.id;
        const interviews = await req.interviewStorage.getCandidateInterviews(candidateId)
        res.json(interviews)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})*/

module.exports = router;