import { DeepPartial } from "typeorm";
import { Student } from "database";

import { AppDataSource } from "../../utils/data-source";

const studentRepository = AppDataSource.getRepository(Student);

export const createStudent = async (input: DeepPartial<Student>) => {
  return studentRepository.save(studentRepository.create(input));
};

export const findStudentById = async (id: string) => {
  return await studentRepository.findOneBy({ id });
};

export const findAllStudentByUserId = async (userId: string) => {
  return await studentRepository.find({
    where: { userId },
    relations: {
      user: true,
    },
  });
};

export const deleteStudentById = async (id: string) => {
  return await studentRepository.softDelete({ id });
};
