import express from 'express';
import userRouter from "./user.router.js";
import facilityRouter from './facility.router.js';
import categoryRouter from './category.router.js';
import bookingRouter from './booking.router.js';
import roleRouter from './role.router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../utils/swagger.json' assert { type: 'json' };
import notificationRouter from './notification.router.js';
import commentRouter from './comment.router.js';
import chatRouter from './chat.router.js';
import logRouter from './log.router.js';

const router = express.Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
router.use("/users", userRouter);
router.use("/facility", facilityRouter);
router.use("/category", categoryRouter);
router.use("/booking", bookingRouter);
router.use("/role", roleRouter);
router.use("/notification", notificationRouter);
router.use("/comment", commentRouter);
router.use("/chat", chatRouter);
router.use("/log", logRouter);

export default router; 