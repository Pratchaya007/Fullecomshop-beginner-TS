import express, { Router } from "express";
import { userControllers } from "../controllers/user.controllers.js";
import { adminCheck, authCheck } from "../middlewares/authcheck.js";


export const userRouter: Router = express.Router();

userRouter.get("/users", authCheck ,adminCheck , userControllers.listManagement);
userRouter.post("/change-status", authCheck ,adminCheck , userControllers.createManagement);
userRouter.post("/change-role", authCheck ,adminCheck , userControllers.createRoleManagement);

userRouter.post("/user/cart",authCheck, userControllers.createCartManagement);
userRouter.get("/user/cart",authCheck, userControllers.listCartManagement);
userRouter.delete("/user/cart",authCheck, userControllers.deleteCartManagement);

userRouter.post("/user/address",authCheck, userControllers.addUserAddressManagement);

userRouter.post("/user/order",authCheck, userControllers.addOrderManagement);
userRouter.get("/user/order",authCheck, userControllers.listOrderManagement);
