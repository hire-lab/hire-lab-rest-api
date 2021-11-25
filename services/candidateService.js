const Candidate = require('../models/Candidate')

async function getAll(){
    return await Candidate.find({}).lean()
}

async function getOne(id){
    return await Candidate.findById(id).lean()
}

module.exports = {
    getAll,
    getOne
}
