import express from "express";
import { deserializeUser } from "authentication";

import { findUserById } from "../services/user.service";

import {
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
} from "../controllers/auth.controller";

import { validate } from "../middlewares/validate";
import { requireUser } from "../middlewares/require-user";

import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.post("/sign-up", validate(createUserSchema), registerUserHandler);
router.post("/sign-in", validate(loginUserSchema), loginUserHandler);
router.get(
  "/logout",
  deserializeUser(findUserById),
  requireUser,
  logoutHandler
);
router.get("/refresh", refreshAccessTokenHandler);

export default router;
