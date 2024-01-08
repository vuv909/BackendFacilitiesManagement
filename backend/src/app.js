import dotenv from 'dotenv'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import instanceMongoDb from './dbs/connect.mongodb.js'
dotenv.config()
const app = express()

// init middlewares
app.use(morgan("dev"))
app.use(helmet()) // khong bi lo minh dung phan mem gi
app.use(compression()) //compression giup van chuyen giam bot mb
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//init router


// handling catch error

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

export default app