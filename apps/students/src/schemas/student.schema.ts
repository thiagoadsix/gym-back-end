import { GenderType } from "database";
import { nativeEnum, number, object, string, TypeOf } from "zod";

export const createStudentSchema = object({
  body: object({
    userId: string({ required_error: "User ID is required" }),
    name: string({ required_error: "Name is required" }),
    surname: string({ required_error: "Surname is required" }),
    height: number({ required_error: "Height is required" }),
    birthDate: string({
      required_error: "Birth Date is required",
    }).regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Invalid birth date format. Format must be YYYY-MM-DD"
    ),
    city: string({ required_error: "City is required" }),
    state: string({ required_error: "State is required" }),
    gender: nativeEnum(GenderType, { required_error: "Gender is required" }),
    email: string().email({ message: "Must be a valid email." }).optional(),
    phone: string()
      .regex(
        /^\d{2}9\d{8}$/,
        "Invalid phone format. Format must be DDD9XXXXXXXX (e.g., 61912349876)"
      )
      .optional(),
  }),
});

export const getStudentSchema = object({
  params: object({
    id: string({
      required_error: "ID is required",
    }),
  }),
});

export const getAllStudentByUserIdSchema = object({
  params: object({
    userId: string({
      required_error: "User ID is required",
    }),
  }),
});

export const deleteStudentSchema = object({
  params: object({
    id: string({
      required_error: "ID is required",
    }),
  }),
});

export type CreateStudentInput = TypeOf<typeof createStudentSchema>["body"];
export type GetStudentInput = TypeOf<typeof getStudentSchema>["params"];
export type GetAllStudentByIdInput = TypeOf<
  typeof getAllStudentByUserIdSchema
>["params"];
export type DeleteStudentInput = TypeOf<typeof deleteStudentSchema>["params"];
