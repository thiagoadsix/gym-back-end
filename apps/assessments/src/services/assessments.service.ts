import {
  Assessment,
  AssessmentType,
  GenderType,
  Student,
  AssessmentsView,
} from "database";

import { AppDataSource } from "../../utils/data-source";

import { FEMALE_COEFFICIENTS, MALE_COEFFICIENTS } from "../constants";
import {
  CreateAssessmentInput,
  GetAssessmentsByUserIdInput,
} from "../schemas/assessment.schema";

const assessmentRepository = AppDataSource.getRepository(Assessment);
const studentRepository = AppDataSource.getRepository(Student);
const assessmentView = AppDataSource;

export const createAssessment = async (input: CreateAssessmentInput) => {
  const {
    chest,
    abdomen,
    thigh,
    triceps,
    suprailiac,
    weight,
    assessmentType,
    studentId,
  } = input;

  let assessment;

  switch (assessmentType) {
    case AssessmentType.POLLOCK_3:
      assessment = await pollock3({
        chest,
        abdomen,
        thigh,
        triceps,
        suprailiac,
        weight,
        studentId,
      });
      break;

    default:
      console.log("Assessment type does not match.");
      return;
  }

  return assessmentRepository.save(
    assessmentRepository.create({
      studentId,
      assessmentType,
      assessmentData: {
        ...assessment,
        chest,
        abdomen,
        thigh,
        triceps,
        suprailiac,
        weight,
      },
    })
  );
};

const pollock3 = async (
  input: Omit<CreateAssessmentInput, "assessmentType">
) => {
  const { chest, abdomen, thigh, triceps, suprailiac, studentId } = input;

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
    sumOfSkinfolds = triceps + suprailiac + thigh;
    const { a, b, c, d } = FEMALE_COEFFICIENTS;
    bodyDensity =
      a + b * sumOfSkinfolds + c * Math.pow(sumOfSkinfolds, 2) + d * age;
  }

  const bodyFatPercentage = (4.95 / bodyDensity - 4.5) * 100;

  return {
    bodyDensity: bodyDensity.toFixed(2),
    bodyFatPercentage: bodyFatPercentage.toFixed(2),
    sumOfSkinfolds,
  };
};

export const getAssessmentsByUserId = async (
  input: GetAssessmentsByUserIdInput
) => {
  const { userId } = input;

  const view = await assessmentView
    .createQueryBuilder(AssessmentsView, "assessmentsView")
    .where("user_id = :userId", { userId })
    .getMany();

  return view;
};
