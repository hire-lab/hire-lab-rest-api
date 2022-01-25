const router = require('express').Router();

router.get('/', async (req, res) => {
    const interviews = await req.interviewStorage.getAll();
    res.json(interviews)
})

router.get('/:id', async (req, res) => {
    const interviews = await req.interviewStorage.getByJobId();
    res.json(interviews)
})

module.exports = router;
