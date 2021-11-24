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

async function update(original, updated) {
    Object.assign(original, updated)
    await original.save()
    return original;
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