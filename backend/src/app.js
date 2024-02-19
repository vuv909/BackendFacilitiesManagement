import dotenv from 'dotenv'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index.js'
import instanceMongoDb from './dbs/connect.mongodb.js'
import { v2 as cloudinary } from 'cloudinary';
dotenv.config()
const app = express()

// init middlewares
app.use(morgan("dev"))
app.use(helmet()) // khong bi lo minh dung phan mem gi
app.use(compression()) //compression giup van chuyen giam bot mb
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
}))

//init router 
app.use(router);

// handling catch error

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

// config cloudianry
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true,
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

export default app