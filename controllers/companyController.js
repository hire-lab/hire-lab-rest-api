const router = require('express').Router()
const {register, login} = require('../services/companyService')

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if (!email){
            throw new Error('Email is required')
        }

        if (!name){
            throw new Error('Please fill out your name')
        }

        if (password.length < 3){
            throw new Error('Password must be at least 3 characters long.')
        }

        const companyData = await register(name.trim(), email.toLowerCase().trim(), password.trim())
        res.json(companyData)

    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!email || !password){
            throw new Error('Please fill out all fields')
        }

        const companyData = await login(email.trim(), password.trim())
        res.json(companyData)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
}) 

router.get('/logout', (req, res) => {
    res.status(204).end()
})

module.exports = router;