import express from 'express';
import { categoryController } from '../controllers/index.js';
import { body } from 'express-validator';

const categoryRouter = express.Router();

categoryRouter.post(
    "/create",
    categoryController.create
);
categoryRouter.get("/list", categoryController.list);
categoryRouter.delete("/delete", categoryController.remove);

categoryRouter.put("/edit",categoryController.update
);

export default categoryRouter;