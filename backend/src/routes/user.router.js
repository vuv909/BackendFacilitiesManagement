import express from 'express';
import { userController } from '../controllers/index.js';
import authJWT from '../middlewares/authJWT.js';
import { body } from 'express-validator';
import { validator } from '../middlewares/index.js'
const userRouter = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
userRouter.post("/login", userController.login);
// view list user

// Get statstic user by role
userRouter.get("/stastic-by-role", authJWT.verifyToken, userController.getListUserByRole);

userRouter.get("/", [authJWT.verifyToken, authJWT.checkRole("Admin")], userController.FindAll);
// view user profile
// created by: quốc khánh 
userRouter.get("/:id", authJWT.verifyToken, userController.FindOne);

// Update User profile 
userRouter.put("/:id", [authJWT.verifyToken,
body("name").isLength({ max: 100 }).withMessage("Nam user can not exceed 100 words"),
body("name").matches(emailRegex).withMessage("Invalid email format"),
validator.checkError], userController.UpdateOne);


export default userRouter;