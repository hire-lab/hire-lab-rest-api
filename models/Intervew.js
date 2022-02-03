const {Schema, model} = require('mongoose');

const schema = new Schema({
    job: {type: Schema.Types.ObjectId, ref: 'Job'},
    potentialCandidates: [{type: Schema.Types.ObjectId, ref: 'Candidate'}],
    jobTitle: {type: String},
    candidateName: {type: String}
})

module.exports = model('Interview', schema)
