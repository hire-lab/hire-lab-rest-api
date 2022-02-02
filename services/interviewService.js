const Interview = require('../models/Intervew');

async function getAll(filter) {
    return await Interview.find(filter).lean();
}

async function getInterviewsByJobId(jobId) {
    return await Interview.find({ jobId }).lean();
}

async function getCandidateInterviews(candidateId) {
    return await Interview.find({ candidateId }).lean();
}

/*async function bookInterview(jobId){
    const result = new Interview(jobId);
    await result.save()
    return result;
}*/


module.exports = {
    getAll,
    getInterviewsByJobId,
    getCandidateInterviews
}