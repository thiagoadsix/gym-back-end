import { NextFunction, Request, Response } from "express";

import {
  createAssessment,
  getAssessmentsByUserId,
  getAssessmentsStudentByUserId,
} from "../services/assessments.service";

import {
  CreateAssessmentInput,
  GetAssessmentsByUserIdInput,
  GetAssessmentsStudentByUserIdInput,
} from "../schemas/assessment.schema";

export const createAssessmentHandler = async (
  req: Request<{}, {}, CreateAssessmentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const assessment = await createAssessment(body);

    res.status(200).status(200).json({
      status: "success",
      data: {
        assessment,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAssessmentsStudentByUserIdHandler = async (
  req: Request<GetAssessmentsStudentByUserIdInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params;

    const assessments = await getAssessmentsStudentByUserId(params);

    res.status(200).status(200).json({
      status: "success",
      data: {
        assessments,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAssessmentsByUserIdHandler = async (
  req: Request<GetAssessmentsByUserIdInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params;

    const assessments = await getAssessmentsByUserId(params.userId);

    res.status(200).status(200).json({
      status: "success",
      data: {
        assessments,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
