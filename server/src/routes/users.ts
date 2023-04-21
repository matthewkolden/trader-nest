import express, { Router } from "express";

const userRouter: Router = express.Router();

import {
  checkToken,
  dataController,
  apiController,
} from "../controllers/users";

import ensureLoggedIn from "../config/ensureLoggedIn";

// POST /api/users
userRouter.post("/signup", dataController.create, apiController.auth);

// Post /api/users/login
userRouter.post("/login", dataController.login, apiController.auth);

// Get /api/users/check-token
userRouter.get("/check-token", ensureLoggedIn, checkToken);

export default userRouter;
