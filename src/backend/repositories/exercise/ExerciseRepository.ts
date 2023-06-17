import { Exercise } from '@prisma/client';
import { prisma } from '../../database'
import { ExerciseRepositoryInterface } from './ExerciseRepositoryInterface';

export class ExerciseRepository implements ExerciseRepositoryInterface {
    getById(id: number): Promise<Exercise | null> {
        return prisma.exercise.findFirst({ where: { id } });
    }

    getAll(): Promise<Exercise[]> {
        return prisma.exercise.findMany();
    }

    create(exerciseData: Omit<Exercise, 'id'>): Promise<Exercise> {
        return prisma.exercise.create({ data: exerciseData });
    }

    update(id: number, exerciseData: Partial<Exercise>): Promise<Exercise | null> {
        return prisma.exercise.update({ where: { id }, data: exerciseData });
    }

    async delete(id: number): Promise<void> {
        await prisma.exercise.delete({ where: { id } });
    }
}
