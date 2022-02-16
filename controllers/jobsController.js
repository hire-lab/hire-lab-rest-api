const router = require('express').Router();
const preloadJob = require('../middlewares/preloadJob');

router.get('/', async (req, res) => {
    try {
        const jobs = await req.storage.getAll();
        res.json(jobs)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
   
})

router.get('/:id', preloadJob(), (req, res) => {
    try {
        const job = req.jobData;
        res.json(job)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.get('/:id/jobs', async (req, res) => {
    try {
        const companyId = req.params.id;
        const jobs = await req.storage.getByCompanyId(companyId);
        res.json(jobs)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.get('/:id/interviews', async (req, res) => {
    try {
        const jobId = req.params.id;
        const interviews = await req.interviewStorage.getInterviewsByJobId(jobId);
        res.json(interviews)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

/*router.get('/:id/candidates', async (req, res) => {
    try {
        const jobId = req.params.id;
        const candidate = await req.candidateStorage.getByJobId(jobId)
        res.json(candidate)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})*/

router.post('/', async (req, res) => {
    const jobsData = {
        title: req.body.title,
        companyName: req.body.companyName,
        description: req.body.description,
        location: req.body.location,
        companyId: req.body.companyId
    }
    try {
        const result = await req.storage.create(jobsData)
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.put('/:id', preloadJob(), async (req, res) => {
    const updated = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location
    }

    try {
        const result = await req.storage.update(req.params.id, updated)
        res.json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.delete('/:id', preloadJob(), async (req, res) => {
    try {
        await req.storage.remove(req.params.id)
        res.status(204).end()
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})



module.exports = router;