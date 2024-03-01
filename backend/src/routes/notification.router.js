import express from 'express';
import { notificationController } from '../controllers/index.js';

const notificationRouter = express.Router();

// view list notification
notificationRouter.get("/", notificationController.getNotificationByUser);

export default notificationRouter;