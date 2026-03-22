import express, { Router } from "express";
import { authControllers } from "../controllers/auth.controllers.js";
import { adminCheck, authCheck } from "../middlewares/authcheck.js";

export const authRouter: Router = express.Router();

authRouter.post("/login", authControllers.authLogin);
authRouter.post("/register", authControllers.authRegister);
authRouter.post("/current-user", authCheck, authControllers.authcurrentuser);
authRouter.post(
  "/current-admin",
  authCheck,
  adminCheck,
  authControllers.authcurrentuser,
);
