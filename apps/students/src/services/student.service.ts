import { DeepPartial } from "typeorm";
import { Student } from "database";
import { differenceInYears, parse } from "date-fns";

import { AppDataSource } from "../../utils/data-source";

const studentRepository = AppDataSource.getRepository(Student);

export const createStudent = async (input: DeepPartial<Student>) => {
  if (input.birthDate && typeof input.birthDate === "string") {
    const parsedDate = parse(input.birthDate, "yyyy-MM-dd", new Date());

    const age = differenceInYears(new Date(), parsedDate);

    input.age = age;
  }

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
