import express from 'express';
import userRouter from "./user.router.js";
import facilityRouter from './facility.router.js';
import categoryRouter from './category.router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../utils/swagger.json' assert { type: 'json' };

const router = express.Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
router.use("/users", userRouter);
router.use("/facility", facilityRouter);
router.use("/category", categoryRouter)

export default router;