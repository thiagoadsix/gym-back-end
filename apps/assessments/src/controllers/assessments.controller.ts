import { NextFunction, Request, Response } from "express";

import { createAssessmentPollock3 } from "../services/assessments.service";

import { CreateAssessmentPollock3Input } from "../schemas/assessment.schema";

export const createAssessmentPollock3Handler = async (
  req: Request<{}, {}, CreateAssessmentPollock3Input>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const assessment = await createAssessmentPollock3(body);

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
