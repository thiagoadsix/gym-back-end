import express from "express";

import { validate } from "../middlewares/validate";
import { createAssessmentPollock3Schema } from "../schemas/assessment.schema";
import { createAssessmentPollock3Handler } from "../controllers/assessments.controller";

const router = express.Router();

router.post(
  "/pollock-three",
  validate(createAssessmentPollock3Schema),
  createAssessmentPollock3Handler
);

export default router;
