const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Company = require('../models/Company');
const {SECRET} = require('../config')

async function register(name, email, password) {
    const existing = await Company.findOne({email}).lean();
    if (existing){
        const err = new Error('Email is already in use');
        //err.status(409);
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const company = new Company({
        email,
        name,
        hashedPassword
    })

    await company.save()
    console.log(`Authorized as ${email}`)

    return {
        _id: company._id,
        name: company.name,
        email: company.email,
        accessToken: generateToken(company)
    };
}

async function login(email, password){
    const company = await Company.findOne({email}).lean()

    if (!company) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }

    const match = await bcrypt.compare(password, company.hashedPassword)

    if (!match) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }
    console.log(`Authorized as ${email}`)

    return {
        _id: company._id,
        name: company.name,
        email: company.email,
        accessToken: generateToken(company)
    }
}


function generateToken(company){
    const token = jwt.sign({
        _id: company._id,
        email: company.email
    }, SECRET)

    return token;
}

module.exports = {
    register,
    login
}
