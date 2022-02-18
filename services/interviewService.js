const Interview = require('../models/Intervew');
const Candidate = require('../models/Candidate');

async function getAll() {
    return await Interview.find({}).lean();
}

async function getInterviewsByJobId(jobId) {
    return await Interview.find({job: jobId}).lean();
}

/*async function getCandidateInterviews(candidateId) {
    return await Interview.find({ potentialCandidates: candidateId }).lean();
}*/

async function bookInterview(interviewData){ 
    const candidateId = interviewData.potentialCandidates;
    const result = new Interview(interviewData);    
    await result.save();
    await Candidate.findByIdAndDelete(candidateId)
    return result;
}


module.exports = {
    getAll,
    getInterviewsByJobId,
    bookInterview
}