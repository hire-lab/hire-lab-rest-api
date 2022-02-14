const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    companyName: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    companyId: {type: Schema.Types.ObjectId, ref: 'Company'}
})

module.exports = model('Job', schema)