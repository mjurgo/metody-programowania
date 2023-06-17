import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { TRoute } from '../types'
import { TCustomError, handleRequest } from '../../utils/request.utils'
import { ExerciseRepository } from '../../repositories/exercise/ExerciseRepository'

export default {
    method: "get",
    path: "/api/exercise/:id",
    validators: [],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                const repository = new ExerciseRepository
                const exerciseId = parseInt(req.params.id)
                const exercise = await repository.getById(exerciseId)

                if (!exercise) {
                    throw {
                        status: StatusCodes.NOT_FOUND,
                        message: ReasonPhrases.NOT_FOUND,
                        isCustomError: true,
                    } as TCustomError
                }

                return exercise
            },
        }),
} as TRoute
