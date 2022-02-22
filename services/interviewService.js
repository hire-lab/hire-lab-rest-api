const Interview = require('../models/Intervew');

async function getAll(companyId) {
    return await Interview.find({companyId: companyId}).populate('candidateId').populate('jobId').lean();
}

async function getInterviewsByJobId(jobId) {
    return await Interview.find({jobId: jobId}).populate('candidateId').populate('jobId').lean()
}

/*async function getCandidateInterviews(candidateId) {
    return await Interview.find({ potentialCandidates: candidateId }).lean();
}*/

async function bookInterview(interviewData){ 
    /*const existingCandidate = await Interview.find({candidateId: interviewData.candidateId})
    const existingJob = await Interview.find({jobId: interviewData.jobId})

    console.log(existingCandidate)
    if (existingCandidate){
        if (existingJob){
            const err = new Error('Candidate has an interview already');
            throw err;
        }
    }*/

    const result = new Interview(interviewData);    
    await result.save();
    //await Candidate.findByIdAndDelete(candidateId)
    return result;
}


module.exports = {
    getAll,
    getInterviewsByJobId,
    bookInterview
}
