import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { ExerciseRepository } from '../../repositories/exercise/ExerciseRepository'

export default {
    method: "get",
    path: "/api/exercises",
    validators: [],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                const repository = new ExerciseRepository
                const exercises = repository.getAll()

                return exercises
            },
        }),
} as TRoute
