import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { TRoute } from '../types'
import { TCustomError, handleRequest } from '../../utils/request.utils'
import { WorkoutRepository } from '../../repositories/workout/WorkoutRepository'

export default {
    method: "get",
    path: "/api/workout/:id",
    validators: [],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                const repository = new WorkoutRepository
                const workoutId = parseInt(req.params.id)
                const workout = await repository.getById(workoutId)

                if (!workout) {
                    throw {
                        status: StatusCodes.NOT_FOUND,
                        message: ReasonPhrases.NOT_FOUND,
                        isCustomError: true,
                    } as TCustomError
                }

                return workout
            },
        }),
} as TRoute
