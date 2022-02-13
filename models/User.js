const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    hashedPassword:  {type: String}
})

module.exports = model('User', schema)
