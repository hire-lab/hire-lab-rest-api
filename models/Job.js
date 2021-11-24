const {Schema, model} = require('mongoose')


const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    requirements: {type: String, required: true},
    potenitalCandidates: [{type: Schema.Types.ObjectId, ref: 'User'}],
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Job', schema)