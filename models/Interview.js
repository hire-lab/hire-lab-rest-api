const {Schema, model} = require('mongoose')


const schema = new Schema({
    title: {type: String, required: true},
    interviewingCandidates: [{type: Schema.Types.ObjectId, ref: 'Candidate'}]
})

module.exports = model('Interview', schema)