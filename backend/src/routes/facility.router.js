import express from 'express';
import { facilityController } from '../controllers/index.js';

const facilityRouter = express.Router();

facilityRouter.post("/create", facilityController.create);
facilityRouter.get("/list", facilityController.listPagination);
facilityRouter.get("/detail/:id", facilityController.detail);
facilityRouter.put("/update", facilityController.update);
facilityRouter.delete("/delete", facilityController.remove);

export default facilityRouter;