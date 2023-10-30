import express from "express";

import { deserializeUser } from "../middlewares/deserialize-user";
import { requireUser } from "../middlewares/require-user";

import { getMeHandler } from "../controllers/user.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get("/me", getMeHandler);

export default router;
