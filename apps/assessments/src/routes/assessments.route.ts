import express from "express";

import { validate } from "../middlewares/validate";
import {
  createAssessmentPollock3Schema,
  getAssessmentsByUserIdSchema,
} from "../schemas/assessment.schema";
import {
  createAssessmentPollock3Handler,
  getAssessmentsByUserIdHandler,
} from "../controllers/assessments.controller";

const router = express.Router();

router.post(
  "/pollock-three",
  validate(createAssessmentPollock3Schema),
  createAssessmentPollock3Handler
);
router.get(
  "/:userId/user",
  validate(getAssessmentsByUserIdSchema),
  getAssessmentsByUserIdHandler
);

export default router;
