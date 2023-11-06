import express from "express";

import { validate } from "../middlewares/validate";
import {
  createAssessmentSchema,
  getAssessmentsByUserIdSchema,
} from "../schemas/assessment.schema";
import {
  createAssessmentHandler,
  getAssessmentsByUserIdHandler,
} from "../controllers/assessments.controller";

const router = express.Router();

router.post("", validate(createAssessmentSchema), createAssessmentHandler);
router.get(
  "/:userId/user",
  validate(getAssessmentsByUserIdSchema),
  getAssessmentsByUserIdHandler
);

export default router;
