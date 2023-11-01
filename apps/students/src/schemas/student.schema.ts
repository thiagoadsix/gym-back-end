import { number, object, string, TypeOf, date } from "zod";

export const createStudentSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    surname: string(),
    weight: number({ required_error: "Weight is required" }),
    height: number({ required_error: "Height is required" }),
    sex: string({ required_error: "Sex is required" }),
    birthDate: string({ required_error: "Birth Date is required" }),
    age: number({ required_error: "Age is required" }),
    city: string({ required_error: "City is required" }),
    state: string({ required_error: "State is required" }),
    userId: string({ required_error: "User ID is required" }),
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
