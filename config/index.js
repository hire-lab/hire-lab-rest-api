require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5555,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    SECRET: process.env.SECRET
}
