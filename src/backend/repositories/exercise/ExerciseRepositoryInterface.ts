import { Exercise } from "@prisma/client";

export interface ExerciseRepositoryInterface {
    getById(id: number): Promise<Exercise | null>;
    getAll(): Promise<Exercise[]>;
    create(exercise: Exercise): Promise<Exercise>;
    update(id: number, exerciseData: Partial<Exercise>): Promise<Exercise | null>;
    delete(id: number): Promise<void>;
}
