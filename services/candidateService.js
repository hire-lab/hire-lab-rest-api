const Candidate = require('../models/Candidate')

async function getAll(){
    return await Candidate.find({}).lean()
}


module.exports = {
    getAll
}