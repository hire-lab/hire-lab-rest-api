const Interview = require('../models/Intervew');
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');

async function getAll() {
    return await Interview.find({}).lean();
}

async function getByJobId(id){
    return await Interview.findById(id).lean();
}

async function bookInterview(jobId, candidateId){
    const candidate = await Candidate.findById(candidateId).lean();
    const job = await Job.findById(jobId).lean();
    console.log(candidate)
    console.log(job)

    candidate.interview.push(jobId);
    job.potentialCandidates.push(candidateId);

    await candidate.save();
    await job.save();

    const result = new Interview(jobId, candidateId);
    await result.save()
    return result;
}

module.exports = {
    getAll,
    getByJobId,
    bookInterview
}