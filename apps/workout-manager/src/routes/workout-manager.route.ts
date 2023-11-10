import express from "express";

import { validate } from "../middlewares/validate";

import {
  createWorkoutWithExercisesSchema,
  getWorkoutsByStudentIdsSchema,
} from "../schemas/workout-manager.schema";

import {
  createWorkoutHandler,
  getWorkoutsByStudentIdsHandler,
} from "../controllers/workout-manager.controller";

const router = express.Router();

router.post(
  "/",
  validate(createWorkoutWithExercisesSchema),
  createWorkoutHandler
);
router.get(
  "/:studentIds/student",
  validate(getWorkoutsByStudentIdsSchema),
  getWorkoutsByStudentIdsHandler
);

export default router;
