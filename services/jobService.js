const Job = require('../models/Job')

async function getAll() {
    return await Job.find({}).lean()
}

async function getById(id) {
    return await Job.findById(id).lean()
}

async function create(data) {
    const result = new Job(data);
    await result.save()
    return result;
}

async function update(id, updated) {
    const job = await Job.findById(id)

    job.title = updated.title;
    job.description = updated.description;

    return job.save()
}

async function remove(id){
    return Job.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    getById,
    create, 
    update,
    remove
}
