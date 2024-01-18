import express from 'express';
import userRouter from "./user.router.js";
import facilityRouter from './facility.router.js';
import categoryRouter from './category.router.js';

const router = express.Router();

router.use("/users", userRouter);
router.use("/facility", facilityRouter);
router.use("/category", categoryRouter)

export default router;