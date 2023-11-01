import express from "express";
import {
  createStudentHandler,
  getStudentHandler,
  getAllStudentHandler,
  deleteStudentHandler,
} from "../controllers/student.controller";

import {
  createStudentSchema,
  getStudentSchema,
  deleteStudentSchema,
} from "../schemas/student.schema";

import { validate } from "../middlewares/validate";

const router = express.Router();

router.post("/", validate(createStudentSchema), createStudentHandler);
router.get("/:id", validate(getStudentSchema), getStudentHandler);
router.get("/", getAllStudentHandler);
router.delete("/:id", validate(deleteStudentSchema), deleteStudentHandler);

export default router;
