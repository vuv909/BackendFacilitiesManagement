import express from 'express';
import { bookingController } from '../controllers/index.js';
import { authJWT } from '../middlewares/index.js'
import { body } from 'express-validator';
import { validator } from '../middlewares/index.js'
import moment from 'moment';
const bookingRouter = express.Router();

bookingRouter.get("/", authJWT.verifyToken, bookingController.listPagination);
bookingRouter.post("/", [authJWT.verifyToken, authJWT.checkRole("Student") || authJWT.checkRole("Admin"),
body("booker").notEmpty().withMessage("booker cannot be null"),
body("facilityId").notEmpty().withMessage("facility cannot be null"),
body("weekdays").isLength({ max: 50 }).withMessage("Week can not exceed 50 words"),
body("slot").isLength({ max: 50 }).withMessage("slot can not exceed 50 words"),
body("weeks").isLength({ max: 50 }).withMessage("Week days can not exceed 50 words"), validator.checkError], bookingController.create);
bookingRouter.get("/dashboard/month", [authJWT.verifyToken, authJWT.checkRole("Admin")], bookingController.Dashboard);
bookingRouter.get("/dashboard/week", [authJWT.verifyToken, authJWT.checkRole("Admin")], bookingController.DashboardWeek);

bookingRouter.get("/status/:id", authJWT.verifyToken, bookingController.statusBooking);
bookingRouter.get("/:id", authJWT.verifyToken, bookingController.detail);
bookingRouter.get("/user/:id", authJWT.verifyToken, bookingController.FindBoookinUser);
bookingRouter.put("/:id", [authJWT.verifyToken, authJWT.checkRole("Admin")], bookingController.update);
bookingRouter.delete("/:id", [authJWT.verifyToken, authJWT.checkRole("Admin")], bookingController.remove);

export default bookingRouter;