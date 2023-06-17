import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { prisma } from '../../database'
import { TRoute } from '../types'
import { TCustomError, handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { ExerciseRepository } from '../../repositories/exercise/ExerciseRepository'

export default {
    method: "delete",
    path: "/api/exercise/:id",
    validators: [
        authorize,
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.NO_CONTENT,
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

                repository.delete(exerciseId)
            },
        }),
} as TRoute
