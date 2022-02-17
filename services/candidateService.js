const Candidate = require('../models/Candidate');

async function getAllCandidatesByCompanyId(companyId){
    return await Candidate.find({companyId: companyId}).lean()
}

async function getOne(id){
    return await Candidate.findById(id).populate('jobId').lean()
}

async function create(data) {
    const {name, email, cv, jobId, companyId} = data;

    const existing = await Candidate.findOne({email});
    if (existing){
        if (existing.jobId.includes(jobId)){
            const err = new Error('You already applied for this job.');
            //err.status(409);
            throw err;
        } 
        if (existing.companyId.includes(companyId)) {
            existing.jobId.push(jobId)
            await existing.save()
            return existing;
        }
        existing.jobId.push(jobId)
        existing.companyId.push(companyId)

        await existing.save()
        return existing;
    }

    const result = new Candidate(data)
    await result.save()
    return result;
}

async function update(id, updated) {
    const candidate = await Candidate.findById(id)

    candidate.name = updated.name;
    candidate.email = updated.email;

    await candidate.save()
    return candidate;
}

async function remove(id) {
    return Candidate.findByIdAndDelete(id)
}

module.exports = {
    getAllCandidatesByCompanyId,
    getOne,
    create,
    update,
    remove
}
