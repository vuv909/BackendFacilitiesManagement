import dotenv from 'dotenv'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index.js'
import instanceMongoDb from './dbs/connect.mongodb.js'
import { v2 as cloudinary } from 'cloudinary';
import { Server } from 'socket.io'
import http from 'http';
import cron from 'node-cron'

dotenv.config()
const app = express()

// init middlewares
app.use(morgan("dev"))
app.use(helmet()) // khong bi lo minh dung phan mem gi
app.use(compression()) //compression giup van chuyen giam bot mb
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
const server = http.createServer(app);
const socketIo = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Enable credentials (important for cookies and authentication)
    },
});
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
}))

//init router 
app.use(router);

//init socket
const connectedUsers = {};
const connectedAdmin = {};
socketIo.on('connection', (socket) => {

    socket.on('storeUserId', (id) => {
        connectedUsers[id] = socket.id;
    })

    socket.on('storeAdminId', (id) => {
        connectedAdmin[id] = socket.id;
    })

    socket.on('privateMessage', async ({ sender, receiver, message }) => {
        console.log(sender, receiver, message);
        if (receiver && receiver != undefined) {
            let receiverSocketId = connectedUsers[receiver];
            try {
                // Send the message to the receiver only
                socketIo.to(receiverSocketId).emit('privateMessage', {
                    sender,
                    message,
                });
            } catch (error) {
                console.error('Error saving message to the database:', error);
            }
        } else {
            // Send message to list admin
            for (const key in connectedAdmin) {
                const adminSocketId = connectedAdmin[key];
                socketIo.to(adminSocketId).emit('privateMessage', {
                    sender,
                    message
                })
            }
        }
    });
});

// cron job for run every day at 00:00
cron.schedule('0 0 * * *', () => {
    console.log("Run at 00:00 to cancel request expried!");
})

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

export default server