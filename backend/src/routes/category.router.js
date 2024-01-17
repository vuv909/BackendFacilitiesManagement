import express from 'express';
import { categoryController } from '../controllers/index.js';

const categoryRouter = express.Router();

categoryRouter.post("/create", categoryController.create);

export default categoryRouter;