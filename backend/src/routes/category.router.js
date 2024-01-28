import express from 'express';
import { categoryController } from '../controllers/index.js';
import { body } from 'express-validator';

const categoryRouter = express.Router();

categoryRouter.post(
    "/create",
    [body("categoryName").isLength({ min: 1 }).withMessage("Name can't be empty")],
    categoryController.create
);
categoryRouter.get("/list", categoryController.list);
categoryRouter.delete("/delete", categoryController.remove);

categoryRouter.put(
    "/edit",
    [
        body("categoryName").isLength({ min: 1 }).withMessage("Name can't be empty"),
        body("id").isLength({ min: 1 }).withMessage("Id can not be null")
    ],
    categoryController.update
);

export default categoryRouter;