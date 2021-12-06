const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, match: [/(?:\@company\.com)/, 'Please provide valid company\'s email address']},
    name: {type: String, required: true},
    hashedPassword:  {type: String}
})

module.exports = model('User', schema)
