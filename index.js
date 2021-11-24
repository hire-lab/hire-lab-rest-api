const express = require('express')
const dbConfig = require('./config/database')
const {PORT} = require('./config/index')
const cors = require('./middlewares/cors')
const storage = require('./middlewares/storage')
const auth = require('./middlewares/auth')
const candidateStorage = require('./middlewares/candidateStorage')
const userController = require('./controllers/userController') 
const jobsController = require('./controllers/jobsController') 
const candidateController = require('./controllers/candidateController')

start()

async function start(){

    const app = express()

    await dbConfig(app)
    
    app.use(cors())
    app.use(auth())
    app.use(storage())
    app.use(candidateStorage())
    app.use(express.json())

    app.use('/users', userController)
    app.use('/candidates', candidateController)
    app.use('/jobs', jobsController)

    app.listen(PORT, () => console.log(`REST Service is running on port ${PORT}`))
}