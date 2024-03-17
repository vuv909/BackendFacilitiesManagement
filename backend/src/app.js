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
import bookingService from './services/booking.service.js'
import { STARTDATE_SLOT1, ENDDATE_SLOT1, STARTDATE_SLOT2, ENDDATE_SLOT2, STARTDATE_SLOT3, ENDDATE_SLOT3, STARTDATE_SLOT4, ENDDATE_SLOT4, STARTDATE_SLOT5, ENDDATE_SLOT5, STARTDATE_SLOT6, ENDDATE_SLOT6, STARTDATE_SLOT7, ENDDATE_SLOT7, STARTDATE_SLOT8, ENDDATE_SLOT8, STARTDATE_SLOT9, ENDDATE_SLOT9 } from '../src/Enum/DateTimeSlot.js';

// Tạo mảng chứa các time slot
const timeSlots = [
    { startTime: STARTDATE_SLOT1, endTime: ENDDATE_SLOT1 },
    { startTime: STARTDATE_SLOT2, endTime: ENDDATE_SLOT2 },
    { startTime: STARTDATE_SLOT3, endTime: ENDDATE_SLOT3 },
    { startTime: STARTDATE_SLOT4, endTime: ENDDATE_SLOT4 },
    { startTime: STARTDATE_SLOT5, endTime: ENDDATE_SLOT5 },
    { startTime: STARTDATE_SLOT6, endTime: ENDDATE_SLOT6 },
    { startTime: STARTDATE_SLOT7, endTime: ENDDATE_SLOT7 },
    { startTime: STARTDATE_SLOT8, endTime: ENDDATE_SLOT8 },
    { startTime: STARTDATE_SLOT9, endTime: ENDDATE_SLOT9 }
];

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

// Hàm kiểm tra xem thời gian hiện tại có nằm trong một time slot không
function isInTimeSlot(slot) {
    const currentTime = new Date();
    const startTime = new Date(slot.startTime);
    const endTime = new Date(slot.endTime);
    return currentTime >= startTime && currentTime <= endTime;
}
// cron job for run every day at 00:00
cron.schedule('* * * * *', async () => {
    console.log("Start clean booking expried!!!");
    await bookingService.CheckExpireBooking();

})
// Cấu hình cron job để chạy vào mỗi ngày lúc 09:00:00 và các thời điểm khác theo yêu cầu
cron.schedule('20 7 * * *', async () => {
    await bookingService.CheckUnusedBooking('Slot1');
});
cron.schedule('40 10 * * *', async () => {
    await bookingService.CheckUnusedBooking('Slot2');
});
cron.schedule('40 12 * * *', async () => {
    await bookingService.CheckUnusedBooking('Slot3');
});
cron.schedule('20 15 * * *', async () => {
    await bookingService.CheckUnusedBooking('Slot4');
});
cron.schedule('30 17 * * *', async () => {
    await bookingService.CheckUnusedBooking('Slot5');
});
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