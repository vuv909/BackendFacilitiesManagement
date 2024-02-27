import express from 'express';
import { facilityController } from '../controllers/index.js';
import { authJWT, validator } from '../middlewares/index.js'
import { body } from 'express-validator';

const facilityRouter = express.Router();

facilityRouter.post("/create",
    [
        authJWT.verifyToken,
        validator.validatorFormData("img", true),
        body("name").notEmpty().withMessage("Name of facility can not be null"),
        validator.checkError
    ],
    facilityController.create);
facilityRouter.get("/list", facilityController.listPagination);
facilityRouter.get("/detail/:id", facilityController.detail);
facilityRouter.put("/update",
    [
        validator.validatorFormData("img", false),
        body("name").notEmpty().withMessage("Name of facility can not be null"),
        validator.checkError
    ],
    facilityController.update);
facilityRouter.delete("/delete", facilityController.remove);

export default facilityRouter;