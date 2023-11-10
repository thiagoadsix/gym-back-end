import { NextFunction, Request, Response } from "express";

import {
  createWorkout,
  getWorkoutsByStudentIds,
} from "../services/workout-manager.service";

import {
  CreateWorkoutWithExercisesInput,
  GetWorkoutsByStudentIdsInput,
} from "../schemas/workout-manager.schema";

export const createWorkoutHandler = async (
  req: Request<{}, {}, CreateWorkoutWithExercisesInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const workout = await createWorkout(body);

    res.status(200).status(200).json({
      status: "success",
      data: {
        workout,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getWorkoutsByStudentIdsHandler = async (
  req: Request<GetWorkoutsByStudentIdsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params.studentIds.split(",");

    const workouts = await getWorkoutsByStudentIds(params);

    res.status(200).status(200).json({
      status: "success",
      data: {
        workouts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
