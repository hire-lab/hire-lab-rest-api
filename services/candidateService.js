const Candidate = require('../models/Candidate')

async function getAll(){
    return await Candidate.find({}).lean()
}

async function getOne(id){
    return await Candidate.findById(id).lean()
}

async function create(data) {
    const result = new Candidate(data)
    await result.save()
    return result;
}

module.exports = {
    getAll,
    getOne,
    create
}
