const {Schema, model} = require('mongoose');

const schema = new Schema({
    job: {type: Schema.Types.ObjectId, ref: 'Job'},
    potenitalCandidates: [{type: Schema.Types.ObjectId, ref: 'Candidate'}]
})

module.exports = model('Interview', schema)