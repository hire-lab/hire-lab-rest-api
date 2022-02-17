const {Schema, model} = require('mongoose')

const schema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    cv: {type: String, required: true},
    jobId: [{type: Schema.Types.ObjectId, ref: 'Job'}],
    companyId: [{type: Schema.Types.ObjectId, ref: 'Company'}]
})

module.exports = model('Candidate', schema)