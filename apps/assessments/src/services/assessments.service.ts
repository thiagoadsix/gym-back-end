import { Assessment, AssessmentType, GenderType, Student } from "database";

import { FEMALE_COEFFICIENTS, MALE_COEFFICIENTS } from "../constants";
import { CreateAssessmentPollock3Input } from "../schemas/assessment.schema";
import { AppDataSource } from "../../utils/data-source";

const assessmentRepository = AppDataSource.getRepository(Assessment);
const studentRepository = AppDataSource.getRepository(Student);

export const createAssessmentPollock3 = async (
  input: CreateAssessmentPollock3Input
) => {
  const { chest, abdomen, thigh, tricep, suprailiac, studentId } = input;
  let sumOfSkinfolds: number;
  let bodyDensity: number;

  const student = await studentRepository.findOne({ where: { id: studentId } });

  if (!student) {
    return;
  }

  const { age, gender } = student;

  if (gender === GenderType.MALE) {
    sumOfSkinfolds = chest + abdomen + thigh;
    const { a, b, c, d } = MALE_COEFFICIENTS;
    bodyDensity =
      a + b * sumOfSkinfolds + c * Math.pow(sumOfSkinfolds, 2) + d * age;
  } else {
    sumOfSkinfolds = tricep + suprailiac + thigh;
    const { a, b, c, d } = FEMALE_COEFFICIENTS;
    bodyDensity =
      a + b * sumOfSkinfolds + c * Math.pow(sumOfSkinfolds, 2) + d * age;
  }

  const bodyFatPercentage = (4.95 / bodyDensity - 4.5) * 100;

  return assessmentRepository.save(
    assessmentRepository.create({
      studentId,
      assessmentType: AssessmentType.POLLOCK_3,
      assessmentData: {
        bodyDensity,
        bodyFatPercentage,
        sumOfSkinfolds,
        chest,
        abdomen,
        thigh,
        tricep,
        suprailiac,
      },
    })
  );
};
