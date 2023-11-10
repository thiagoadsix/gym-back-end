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
  GetAssessmentsStudentByUserIdInput,
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
    startDate,
    endDate,
    userId,
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
      name: `${assessment?.studentName}-${startDate}-${endDate}`,
      userId,
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
      startDate,
      endDate,
    })
  );
};

const pollock3 = async (
  input: Omit<
    CreateAssessmentInput,
    "assessmentType" | "startDate" | "endDate" | "userId"
  >
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
    studentName: student.name,
  };
};

export const getAssessmentsStudentByUserId = async (
  input: GetAssessmentsStudentByUserIdInput
) => {
  const { userId } = input;

  const view = await assessmentView
    .createQueryBuilder(AssessmentsView, "assessmentsView")
    .where("user_id = :userId", { userId })
    .getMany();

  return view;
};

export const getAssessmentsByUserId = async (userId: string) => {
  return await assessmentRepository.findBy({ userId });
};
