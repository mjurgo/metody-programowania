import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

import { authorize } from '../../utils/middleware.utils'
import { handleRequest } from '../../utils/request.utils'
import { TRoute } from '../types'
import { ExerciseRepository } from '../../repositories/exercise/ExerciseRepository'

export default {
    method: "post",
    path: "/api/exercise",
    validators: [
        authorize,
        body("name").not().isEmpty(),
        body("description").not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) => {
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: {},
            execute: async () => {
                const repository = new ExerciseRepository

                return repository.create(req.body)
            },
        })
    }
} as TRoute
