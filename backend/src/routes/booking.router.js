import express from 'express';
import { bookingController } from '../controllers/index.js';

const bookingRouter = express.Router();

bookingRouter.post("/", bookingController.create);
bookingRouter.get("/", bookingController.listPagination);
bookingRouter.get("/status", bookingController.statusBooking);

bookingRouter.get("/:id", bookingController.detail);
bookingRouter.put("/:id", bookingController.update);
bookingRouter.delete("/:id", bookingController.remove);

export default bookingRouter;