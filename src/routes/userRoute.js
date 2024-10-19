import express from "express";
import UserController from "../controllers/UserController";

const userRoute = express.Router()

userRoute.get('/users', UserController.getAllUsers())

export default userRoute