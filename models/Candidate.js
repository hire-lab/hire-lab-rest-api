const {Schema, model} = require('mongoose')

const schema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    interview: {type: Schema.Types.ObjectId, ref: 'Interview'}
})

module.exports = model('Candidate', schema)
