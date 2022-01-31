const Interview = require('../models/Intervew');
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');

async function getAll() {
    return await Interview.find({}).lean();
}

async function getByJobId(id){
    return await Interview.findById(id).lean();
}

/*async function bookInterview(jobId){
    const result = new Interview(jobId);
    await result.save()
    return result;
}*/

module.exports = {
    getAll,
    getByJobId,
    bookInterview
}
