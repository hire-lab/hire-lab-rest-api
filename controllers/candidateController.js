const router = require('express').Router();
const preload = require('../middlewares/preload')

router.get('/', async (req, res) => {
    const candidates = await req.candidateStorage.getAll();
    res.json(candidates)
})

router.get('/:id', preload(), (req, res) => {
    const candidate = req.data;
    console.log(candidate)
    res.json(candidate)
})

module.exports = router;
