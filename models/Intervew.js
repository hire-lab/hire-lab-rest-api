const {Schema, model} = require('mongoose');

const schema = new Schema({
    jobId: {type: Schema.Types.ObjectId, ref: 'Job'},
    candidateId: {type: Schema.Types.ObjectId, ref: 'Candidate'},
    companyId: {type: Schema.Types.ObjectId, ref: 'Company'}
})

module.exports = model('Interview', schema)
