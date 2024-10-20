import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addRequestUserValidator, deleteUserValidatore, updateUserValidatore } from "../validators/userValidator.js";

const userRoute = express.Router()

userRoute.get('/users',authMiddleware, UserController.getAllUsers)
// userRoute.get('/users', UserController.getAllUsers)
userRoute.post('/users', authMiddleware, addRequestUserValidator,  UserController.createUser)
userRoute.put('/users/:id', authMiddleware,updateUserValidatore, UserController.updateUser)
userRoute.delete('/users/:id', deleteUserValidatore, UserController.deleteUser)

export default userRoute