const router = require('express').Router();
const {isAuth, isOwner} = require('../middlewares/guards')
const preload = require('../middlewares/preload')

router.get('/', async (req, res) => {
   const jobs = await req.storage.getAll();
   res.json(jobs)
})

//add isAuth() middleware after authentication is set up
router.post('/', async (req, res) => {
    const jobsData = {
        title: req.body.title,
        description: req.body.description
    }
    try {
        const result = await req.storage.create(jobsData)
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

/*router.get('/:id', preload(), async (req, res) => {
    const job = req.data.toObject();
   res.json(job)
})

router.put('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    const updated = {
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements
    }

    try {
        const result = await req.storage.update(req.data, updated)
        res.json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.delete('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    try {
        await req.storage.remove(req.params.id)
        res.status(204).end()
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})*/

module.exports = router;
