import express from "express";

import { validate } from "../middlewares/validate";
import {
  createAssessmentSchema,
  getAssessmentsByUserIdSchema,
  getAssessmentsStudentByUserIdSchema,
} from "../schemas/assessment.schema";
import {
  createAssessmentHandler,
  getAssessmentsByUserIdHandler,
  getAssessmentsStudentByUserIdHandler,
} from "../controllers/assessments.controller";

const router = express.Router();

router.post("", validate(createAssessmentSchema), createAssessmentHandler);
router.get(
  "/students/:userId/user",
  validate(getAssessmentsStudentByUserIdSchema),
  getAssessmentsStudentByUserIdHandler
);
router.get(
  "/:userId/user",
  validate(getAssessmentsByUserIdSchema),
  getAssessmentsByUserIdHandler
);

export default router;
