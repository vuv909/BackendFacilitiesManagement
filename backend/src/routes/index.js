import express from 'express';
import userRouter from "./user.router.js";
import facilityRouter from './facility.router.js';

const router = express.Router();

router.use("/users", userRouter);
router.use("/facility", facilityRouter);

export default router;