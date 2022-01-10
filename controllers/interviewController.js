const router = require('express').Router();

router.get('/', async (req, res) => {
    const interviews = await req.interviewStorage.getAll();
    res.json(interviews)
})

module.exports = router;