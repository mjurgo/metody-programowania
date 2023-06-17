import { Result, Workout } from '@prisma/client';
import { prisma } from '../../database'
import { WorkoutRepositoryInterface } from './WorkoutRepositoryInterface';

export class WorkoutRepository implements WorkoutRepositoryInterface {
    getById(id: number): Promise<Workout | null> {
        return prisma.workout.findFirst({ where: { id } });
    }

    getAll(userId?: string): Promise<Workout[]> {
        return prisma.workout.findMany({
            where: { userId },
            include: {
                results: true
            }
        });
    }

    create(date: Date, userId: string, results: Result[], comment?: string): Promise<Workout> {
        date = new Date(date)

        return prisma.workout.create({
            data: {
                date: date,
                userId: userId,
                comment: comment,
                results: {
                    create: results
                }
            },
            include: {
                results: true
            }
        });
    }

    update(id: number, date: Date, results: Result[], comment?: string): Promise<Workout | null> {
        date = new Date(date)

        return prisma.workout.update({
            where: { id },
            data: {
                date: date,
                comment: comment,
                results: {
                    upsert: results.map((result) => ({
                        where: { id: result.id },
                        create: result,
                        update: result,
                    })),
                }
            },
            include: {
                results: true
            }
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.workout.delete({ where: { id } });
    }
}
