const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const {SECRET} = require('../config')

async function register(email, name, cv, password) {
    const existing = await User.findOne({email}).lean();
    if (existing){
        const err = new Error('Email is already in use');
        //err.status(409);
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        email,
        name,
        cv,
        hashedPassword
    })

    await user.save()
    console.log(`Authorized as ${email}`)

    return {
        _id: user._id,
        email: user.email,
        name: user.name,
        cv: user.cv,
        accessToken: generateToken(user)
    };
}

async function login(email, password){
    const user = await User.findOne({email}).lean()

    if (!user) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }

    const match = await bcrypt.compare(password, user.hashedPassword)

    if (!match) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }
    console.log(`Authorized as ${email}`)

    return {
        _id: user._id,
        email: user.email,
        name: user.name,
        cv: user.cv,
        accessToken: generateToken(user)
    }
}

function generateToken(user){
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, SECRET)

    return token;
}

async function getOne(id) {
    return await User.findById(id).lean()
}

async function update(id, updated) {
    const user = await User.findById(id)

    user.name = updated.name;
    user.email = updated.email;
    user.cv = updated.cv;

    await user.save()
    return user;
}
async function remove(id) {
    return User.findByIdAndDelete(id)
}

module.exports = {
    register,
    login,
    getOne,
    update,
    remove
}
