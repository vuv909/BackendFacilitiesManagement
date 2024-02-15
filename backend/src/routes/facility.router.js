import express from 'express';
import { facilityController } from '../controllers/index.js';
import {validator} from '../middlewares/index.js'
import { body } from 'express-validator';

const facilityRouter = express.Router();

facilityRouter.post("/create",
    [validator.validatorFormData("img"),
    body("name").notEmpty().withMessage("Name of facility can not be null"),
    validator.checkError
    ],
    facilityController.create);
facilityRouter.get("/list", facilityController.listPagination);
facilityRouter.get("/detail/:id", facilityController.detail);
facilityRouter.put("/update", facilityController.update);
facilityRouter.delete("/delete", facilityController.remove);

export default facilityRouter;