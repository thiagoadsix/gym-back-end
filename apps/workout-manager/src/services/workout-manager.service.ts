import { Workout, Exercise } from "database";

import { CreateWorkoutWithExercisesInput } from "../schemas/workout-manager.schema";
import { AppDataSource } from "../../utils/data-source";

const workoutRepository = AppDataSource.getRepository(Workout);
const exerciseRepository = AppDataSource.getRepository(Exercise);

export const createWorkout = async (input: CreateWorkoutWithExercisesInput) => {
  return await AppDataSource.transaction(async (transactionalEntityManager) => {
    const workout = workoutRepository.create({
      studentId: input.studentId,
      assessmentId: input.assessmentId,
      objective: input.objective,
      phase: input.phase,
    });

    const savedWorkout = await transactionalEntityManager.save(workout);

    const exercises = input.exercises.map((exerciseInput) => {
      const exercise = exerciseRepository.create({
        workoutId: savedWorkout.id,
        name: exerciseInput.name,
        sets: exerciseInput.sets,
        repetitions: exerciseInput.repetitions,
        videoLink: exerciseInput.videoLink,
        observation: exerciseInput.observation,
        type: exerciseInput.type,
      });

      return exercise;
    });

    await transactionalEntityManager.save(exercises);

    return {
      ...savedWorkout,
      exercises,
    };
  });
};

export const getWorkoutsByStudentIds = async (studentIds: string[]) => {
  const workoutsWithStudents = await workoutRepository
    .createQueryBuilder("workout")
    .leftJoinAndSelect("workout.student", "student")
    .leftJoinAndSelect("workout.exercises", "exercise")
    .where("workout.studentId IN (:...studentIds)", {
      studentIds,
    })
    .select([
      "student.id",
      "student.name",
      "student.height",
      "student.age",
      "student.gender",
      "workout.id",
      "workout.objective",
      "workout.phase",
      "exercise.name",
      "exercise.sets",
      "exercise.repetitions",
      "exercise.type",
      "exercise.videoLink",
      "exercise.observation",
    ])
    .orderBy("workout.createdAt", "DESC")
    .getMany();

  return workoutsWithStudents.map((workout) => ({
    id: workout.student.id,
    name: workout.student.name,
    height: workout.student.height,
    age: workout.student.age,
    gender: workout.student.gender,
    workout: {
      id: workout.id,
      objective: workout.objective,
      phase: workout.phase,
      exercises: workout.exercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
        repetitions: exercise.repetitions,
        type: exercise.type,
        videoLink: exercise.videoLink,
        observation: exercise.observation,
      })),
    },
  }));
};
