import express from 'express';
import { facilityController } from '../controllers/index.js';

const facilityRouter = express.Router();

facilityRouter.post("/create", () => {});
facilityRouter.get("/list", () => {});
facilityRouter.get("/detail/:id", () => {});
facilityRouter.put("/update", () => {});
facilityRouter.delete("/delete", () => {});

export default facilityRouter;