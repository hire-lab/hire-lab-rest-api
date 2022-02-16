const Candidate = require('../models/Candidate');

async function getAll(companyId){
    return await Candidate.find({companyId: companyId}).lean()
}

async function getOne(id){
    return await Candidate.findById(id).lean()
}

async function create(data) {
    const jobId = data.jobId;
    const email = data.email;

    const existing = await Candidate.findOne({email});
    if (existing){
        if (existing.jobId.includes(jobId)){
            const err = new Error('You already applied for this job.');
            //err.status(409);
            throw err;
        } 
        existing.jobId.push(jobId)
        await existing.save()
        return existing;
    }

    const result = new Candidate(data)

    console.log('service data ', data)
    await result.save()
    console.log('saved')
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
    getAll,
    getOne,
    create,
    update,
    remove
}
