import {
  Assessment,
  AssessmentType,
  GenderType,
  Student,
  AssessmentsView,
} from "database";
import { AppError } from "errors";

import { AppDataSource } from "../../utils/data-source";

import {
  FEMALE_3_COEFFICIENTS,
  FEMALE_7_COEFFICIENTS,
  MALE_3_COEFFICIENTS,
  MALE_7_COEFFICIENTS,
} from "../constants";
import {
  CreateAssessmentInput,
  GetAssessmentsStudentByUserIdInput,
  Pollock3FemaleSchema,
  Pollock3MaleSchema,
  Pollock7FemaleSchema,
  Pollock7MaleSchema,
} from "../schemas/assessment.schema";

const assessmentRepository = AppDataSource.getRepository(Assessment);
const studentRepository = AppDataSource.getRepository(Student);
const assessmentView = AppDataSource;

export const createAssessment = async (input: CreateAssessmentInput) => {
  const { assessmentType, startDate, endDate, userId, data, studentId } = input;

  let assessment;

  if (assessmentType === AssessmentType.POLLOCK_3) {
    assessment = await pollock3(
      { male: { ...input.data }, female: { ...input.data } },
      studentId
    );
  } else if (assessmentType === AssessmentType.POLLOCK_7) {
    assessment = await pollock7(
      { male: { ...input.data }, female: { ...input.data } },
      studentId
    );
  } else {
    throw new AppError(401, "Invalid assessment type");
  }

  const fatMass = calculateFatMass(
    input.data.weight,
    assessment.bodyFatPercentage
  );
  const leanMass = calculateLeanMass(input.data.weight, fatMass);

  return assessmentRepository.save(
    assessmentRepository.create({
      name: `${assessment?.studentName}-${startDate}-${endDate}`,
      userId,
      studentId,
      assessmentType,
      assessmentData: {
        bodyDensity: assessment?.bodyDensity,
        bodyFatPercentage: assessment?.bodyFatPercentage,
        sumOfSkinfolds: assessment?.sumOfSkinfolds,
        bmr: assessment.bmr,
        fatMass,
        leanMass,
        ...data,
      },
      startDate,
      endDate,
    })
  );
};

const pollock3 = async (
  input: {
    male: Pollock3MaleSchema & { weight: number };
    female: Pollock3FemaleSchema & { weight: number };
  },
  studentId: string
) => {
  const { male, female } = input;

  let sumOfSkinfolds: number;
  let metrics: { bodyDensity: number; bodyFatPercentage: number };
  let bmr: number;

  const student = await studentRepository.findOne({ where: { id: studentId } });

  if (!student) {
    throw new AppError(401, "Student does not exists.");
  }

  const { age, gender } = student;

  if (gender === GenderType.MALE) {
    const requiredMaleProps = ["chest", "abdomen", "thigh"];

    validateProperties(GenderType.MALE, male, requiredMaleProps);
    sumOfSkinfolds = calculateSumOfSkinfolds(male, requiredMaleProps);
    metrics = calculateBodyMetrics(sumOfSkinfolds, age, MALE_3_COEFFICIENTS);
    bmr = calculateBMR(gender, input.male.weight, student.height, age);
  } else {
    const requiredFemaleProps = ["triceps", "suprailiac", "thigh"];

    validateProperties(GenderType.FEMALE, female, requiredFemaleProps);
    sumOfSkinfolds = calculateSumOfSkinfolds(female, requiredFemaleProps);
    metrics = calculateBodyMetrics(sumOfSkinfolds, age, FEMALE_3_COEFFICIENTS);
    bmr = calculateBMR(gender, input.female.weight, student.height, age);
  }

  return prepareResponse(
    student,
    metrics.bodyDensity,
    metrics.bodyFatPercentage,
    sumOfSkinfolds,
    bmr
  );
};

const pollock7 = async (
  input: {
    male: Pollock7MaleSchema & { weight: number };
    female: Pollock7FemaleSchema & { weight: number };
  },
  studentId: string
) => {
  const { male, female } = input;

  let sumOfSkinfolds: number;
  let metrics: { bodyDensity: number; bodyFatPercentage: number };
  let bmr: number;

  const student = await studentRepository.findOne({ where: { id: studentId } });

  if (!student) {
    return;
  }

  const { age, gender } = student;

  if (gender === GenderType.MALE) {
    const requiredMaleProps = [
      "chest",
      "abdomen",
      "thigh",
      "subscapular",
      "axilla",
      "calf",
      "triceps",
    ];

    validateProperties(GenderType.MALE, male, requiredMaleProps);
    sumOfSkinfolds = calculateSumOfSkinfolds(male, requiredMaleProps);
    metrics = calculateBodyMetrics(sumOfSkinfolds, age, MALE_7_COEFFICIENTS);
    bmr = calculateBMR(gender, input.male.weight, student.height, age);
  } else {
    const requiredFemaleProps = [
      "triceps",
      "suprailiac",
      "thigh",
      "subscapular",
      "axilla",
      "calf",
      "abdomen",
    ];

    validateProperties(GenderType.FEMALE, female, requiredFemaleProps);
    sumOfSkinfolds = calculateSumOfSkinfolds(female, requiredFemaleProps);
    metrics = calculateBodyMetrics(sumOfSkinfolds, age, FEMALE_7_COEFFICIENTS);
    bmr = calculateBMR(gender, input.female.weight, student.height, age);
  }

  return prepareResponse(
    student,
    metrics.bodyDensity,
    metrics.bodyFatPercentage,
    sumOfSkinfolds,
    bmr
  );
};

const validateProperties = (
  gender: GenderType,
  properties: any,
  requiredProps: string[]
) => {
  const missingProps = requiredProps.filter(
    (prop) => properties[prop] === undefined
  );

  if (missingProps.length > 0) {
    throw new AppError(
      400,
      `Missing properties for gender ${gender}: ${missingProps.join(", ")}`
    );
  }
};

const calculateSumOfSkinfolds = (
  properties: any,
  requiredProps: string[]
): number => {
  return requiredProps.reduce((sum, prop) => sum + properties[prop], 0);
};

const calculateBodyMetrics = (
  sumOfSkinfolds: number,
  age: number,
  coefficients: { a: number; b: number; c: number; d?: number }
) => {
  let bodyDensity;

  if (coefficients.d !== undefined) {
    bodyDensity =
      coefficients.a -
      coefficients.b * sumOfSkinfolds +
      coefficients.c * Math.pow(sumOfSkinfolds, 2) -
      coefficients.d * age;
  } else {
    bodyDensity =
      coefficients.a - coefficients.b * sumOfSkinfolds + coefficients.c * age;
  }

  const bodyFatPercentage = (4.95 / bodyDensity - 4.5) * 100;

  return {
    bodyDensity: Number(bodyDensity.toFixed(2)),
    bodyFatPercentage: Number(bodyFatPercentage.toFixed(2)),
  };
};

const prepareResponse = (
  student: Student,
  bodyDensity: number,
  bodyFatPercentage: number,
  sumOfSkinfolds: number,
  bmr: number
) => {
  return {
    bodyDensity,
    bodyFatPercentage,
    sumOfSkinfolds,
    studentName: student.name,
    bmr,
  };
};

const calculateFatMass = (weight: number, bodyFatPercentage: number) => {
  return weight * (bodyFatPercentage / 100);
};

const calculateLeanMass = (weight: number, fatMass: number) => {
  return weight - fatMass;
};

const calculateBMR = (
  gender: GenderType,
  weight: number,
  height: number,
  age: number
) => {
  if (gender === GenderType.MALE) {
    return 66 + 13.7 * weight + 5 * height - 6.8 * age;
  } else {
    return 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  }
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
