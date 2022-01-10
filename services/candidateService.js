const Candidate = require('../models/Candidate');

async function getAll(){
    return await Candidate.find({}).lean()
}

async function getOne(id){
    return await Candidate.findById(id).lean()
}

async function create(data) {
    const email = data.email;
    const existing = await Candidate.findOne({email}).lean();
    if (existing){
        const err = new Error('Email is already in use');
        //err.status(409);
        throw err;
    }

    const result = new Candidate(data)
    await result.save()
    return result;
}


module.exports = {
    getAll,
    getOne,
    create
}