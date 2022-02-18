const router = require('express').Router();
const preloadCandidate = require('../middlewares/preloadCandidate')

//get single candidate
router.get('/:id', preloadCandidate(), async (req, res) => {
    try {
        const id = req.params.id;
        const candidate = await req.candidateStorage.getOne(id)
        candidate.jobs = candidate.jobId.map(j => j.title).join(', ')
        res.json(candidate)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

//get candidate by company id
router.get('/:companyId/candidates/:id', preloadCandidate(), async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const id = req.params.id;
        const candidate = await req.candidateStorage.getOne(id)
        candidate.jobs = candidate.jobId.filter(j => j.companyId == companyId).map(j => j.title).join(', ')
        res.json(candidate)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

//get all candidates by company id
router.get('/:id/candidates', async (req, res) => {
    try {
        const companyId = req.params.id
        const candidates = await req.candidateStorage.getAllCandidatesByCompanyId(companyId);
        res.json(candidates)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

//get all applied for jobs by candidate in single company


//add new candidate
router.post('/', async(req, res) => {
    const candidateData = {
        name: req.body.name,
        email: req.body.email,
        cv: req.body.cv,
        jobId: req.body.jobId,
        companyId: req.body.companyId,
        userId: req.body.userId
    }

    try {
        const result = await req.candidateStorage.create(candidateData)
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

//edit candidate
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

//delete candidate
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