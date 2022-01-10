const express = require('express')
const dbConfig = require('./config/database')
const {PORT} = require('./config/index')
const cors = require('./middlewares/cors')
const auth = require('./middlewares/auth')
const logger = require('./middlewares/logger')
const jobStorage = require('./middlewares/jobStorage')
const candidateStorage = require('./middlewares/candidateStorage')
const interviewStorage = require('./middlewares/interviewStorage')
const userController = require('./controllers/userController') 
const jobsController = require('./controllers/jobsController') 
const candidateController = require('./controllers/candidateController')
const interviewController = require('./controllers/interviewController')

start()

async function start(){

    const app = express()

    await dbConfig(app)
    
    app.use(cors())
    app.use(auth())
    app.use(logger())
    app.use(jobStorage())
    app.use(candidateStorage())
    app.use(interviewStorage())
    app.use(express.json())

    app.use('/users', userController)
    app.use('/candidates', candidateController)
    app.use('/jobs', jobsController)
    app.use('/interviews', interviewController)

    app.listen(PORT, () => console.log(`REST Service is running on port ${PORT}`))
}