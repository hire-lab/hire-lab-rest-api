const router = require('express').Router();

router.get('/', async (req, res) => {
    const candidates = await req.candidateStorage.getAll();
    res.json(candidates)
})

module.exports = router;