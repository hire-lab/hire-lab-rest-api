const router = require('express').Router()
const {register, login, getOne, update, remove} = require('../services/userService')

router.post('/register', async (req, res) => {
    const {email, name, cv, password} = req.body;

    try {
        if (!email){
            throw new Error('Email is required')
        }

        if (!name){
            throw new Error('Please fill out your name')
        }

        if (!cv){
            throw new Error('Please provide CV URL')
        }

        if (password.length < 3){
            throw new Error('Password must be at least 3 characters long.')
        }

        const userData = await register(email.toLowerCase().trim(), name.trim(), cv.trim(), password.trim())
        res.json(userData)

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

        const userData = await login(email.trim(), password.trim())
        res.json(userData)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
}) 

router.get('/logout', (req, res) => {
    res.status(204).end()
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getOne(id)
        res.json(user)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.put('/:id', async (req, res) => {
    const updated = {
        name: req.body.name,
        email: req.body.email,
        cv: req.body.cv
    }

    try {
        const result = await update(req.params.id, updated)
        res.json(result)
    }catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.delete('/:id', async(req, res) => {
    try {
        await remove(req.params.id)
        res.status(204).end()
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})


module.exports = router;