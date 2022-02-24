const endOfDayfrom  = require('date-fns/endOfDay')
const startOfDay = require('date-fns/startOfDay')
const Interview = require('../models/Intervew');

async function getAll(companyId, date) {
    return await Interview
        .find({companyId: companyId})
        .where({
            date: {
                $gte: startOfDay(date),
                $lt: endOfDayfrom(date)
            }
        })
        .sort({time: 1})
        .populate('candidateId')
        .populate('jobId')
        .lean();
}

async function getInterviewsByJobId(jobId, date) {
    return await Interview
        .find({jobId: jobId})
        .where({
            date: {
                $gte: startOfDay(date),
                $lt: endOfDayfrom(date)
            }
        })
        .sort({time: 1})
        .populate('candidateId')
        .populate('jobId')      
        .lean()
}


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
