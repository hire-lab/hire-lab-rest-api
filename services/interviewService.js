const Interview = require('../models/Intervew');
const Job = require('../models/Job');

async function getAll(filter) {
    return await Interview.find({filter}).lean();
}

async function getInterviewsByJobId(jobId) {
    return await Interview.find({ jobId }).lean();
}

async function getCandidateInterviews(candidateId) {
    return await Interview.find({ candidateId }).lean();
}

async function bookInterview(interviewData){
    const result = new Interview(interviewData);    
    await result.save();
    return result;
}


module.exports = {
    getAll,
    getInterviewsByJobId,
    getCandidateInterviews,
    bookInterview
}