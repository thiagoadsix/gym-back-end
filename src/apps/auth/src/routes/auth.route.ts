import express from "express";
import {
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
} from "../controllers/auth.controller";

import { validate } from "../middlewares/validate";
import { deserializeUser } from "../middlewares/deserialize-user";
import { requireUser } from "../middlewares/require-user";

import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.post("/register", validate(createUserSchema), registerUserHandler);
router.post("/login", validate(loginUserSchema), loginUserHandler);
router.get("/logout", deserializeUser, requireUser, logoutHandler);
router.get("/refresh", refreshAccessTokenHandler);

export default router;
