
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { prisma } from '../../database'
import { TRoute } from '../types'
import { TCustomError, handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { body } from 'express-validator'
import { ExerciseRepository } from '../../repositories/exercise/ExerciseRepository'

export default {
    method: "put",
    path: "/api/exercise/:id",
    validators: [
        authorize,
        body("name").not().isEmpty(),
        body("description").not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                const repository = new ExerciseRepository
                const exerciseId = parseInt(req.params.id)

                try {
                    const exercise = await repository.update(exerciseId, req.body)

                    return exercise
                } catch {
                    throw {
                        status: StatusCodes.NOT_FOUND,
                        message: ReasonPhrases.NOT_FOUND,
                        isCustomError: true,
                    } as TCustomError
                }
            },
        }),
} as TRoute
