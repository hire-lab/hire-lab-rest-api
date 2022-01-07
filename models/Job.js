const {Schema, model} = require('mongoose')


const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    potenitalCandidates: [{type: Schema.Types.ObjectId, ref: 'Candidate'}]
})

module.exports = model('Job', schema)
