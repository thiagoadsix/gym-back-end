import { NextFunction, Request, Response } from "express";

import {
  createStudent,
  deleteStudentById,
  findAllStudentByUserId,
  findStudentById,
} from "../services/student.service";
import {
  CreateStudentInput,
  DeleteStudentInput,
  GetAllStudentByIdInput,
  GetStudentInput,
} from "../schemas/student.schema";

export const createStudentHandler = async (
  req: Request<{}, {}, CreateStudentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const student = await createStudent(body);

    res.status(200).status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getStudentHandler = async (
  req: Request<GetStudentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const student = await findStudentById(id);

    res.status(200).status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllStudentByUserHandler = async (
  req: Request<GetAllStudentByIdInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const students = await findAllStudentByUserId(userId);

    res.status(200).status(200).json({
      status: "success",
      data: {
        students,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteStudentHandler = async (
  req: Request<DeleteStudentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const students = await deleteStudentById(id);

    res.status(200).status(200).json({
      status: "success",
      data: {
        students,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
