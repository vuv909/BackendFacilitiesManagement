import express from 'express';
import { categoryController } from '../controllers/index.js';
import { body } from 'express-validator';
import { validator } from '../middlewares/index.js'

const categoryRouter = express.Router();

categoryRouter.post(
    "/create",
    [validator.validatorFormData("img", true), 
    body("categoryName").notEmpty().withMessage("Category name cannot be empty"),
    body("categoryName").isLength({max: 1000}).withMessage("Category can not exceed 1000 words"),
    body("files").notEmpty().withMessage("Image cannot be null"),
    validator.checkError],
    categoryController.create
);
categoryRouter.get("/list", categoryController.list);
categoryRouter.delete("/delete", categoryController.remove); 

categoryRouter.put(
    "/edit",
    [validator.validatorFormData("img", false),
    body("categoryName").notEmpty().withMessage("Category name cannot be empty"),
    body("categoryName").isLength({max: 1000}).withMessage("Category can not exceed 1000 words"),
    body("id").notEmpty().withMessage("Id cannot be null"),
    validator.checkError],
    categoryController.update
);

export default categoryRouter;