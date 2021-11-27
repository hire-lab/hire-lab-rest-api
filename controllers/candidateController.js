const router = require('express').Router();
const preloadCandidate = require('../middlewares/preloadCandidate')

router.get('/', async (req, res) => {
    const candidates = await req.candidateStorage.getAll();
    res.json(candidates)
})

router.get('/:id', preloadCandidate(), (req, res) => {
    const candidate = req.data;
    console.log(candidate)
    res.json(candidate)
})

module.exports = router;
