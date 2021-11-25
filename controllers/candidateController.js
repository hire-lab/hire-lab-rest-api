const router = require('express').Router();
const preload = require('../middlewares/preload')

router.get('/', async (req, res) => {
    const candidates = await req.candidateStorage.getAll();
    res.json(candidates)
})

router.get('/:id', preload(), async (req, res) => {
    const candidate = await req.candidateStorage.getOne()
    res.json(candidate)
})

module.exports = router;
