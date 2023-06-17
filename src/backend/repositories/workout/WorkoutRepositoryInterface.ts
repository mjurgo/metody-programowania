import { Result, Workout } from "@prisma/client";

export interface WorkoutRepositoryInterface {
    getById(id: number): Promise<Workout | null>;
    getAll(userId?: string): Promise<Workout[]>;
    create(date: Date, userId: string, results: Result[], comment?: string): Promise<Workout>;
    update(id: number, date: Date, results: Result[], comment?: string): Promise<Workout | null>;
    delete(id: number): Promise<void>;
}
