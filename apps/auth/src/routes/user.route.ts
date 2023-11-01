import express from "express";

import { deserializeUser } from "authentication";
import { requireUser } from "../middlewares/require-user";

import { getMeHandler } from "../controllers/user.controller";
import { findUserById } from "../services/user.service";

const router = express.Router();

router.use(deserializeUser(findUserById), requireUser);

router.get("/me", getMeHandler);

export default router;
