import { Request, Response } from 'express'
import { body } from 'express-validator'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { authorize } from '../../utils/middleware.utils'
import { TCustomError, handleRequest } from '../../utils/request.utils'
import { TRoute } from '../types'
import { WorkoutRepository } from '../../repositories/workout/WorkoutRepository'
import { prisma } from '../../database'

export default {
    method: "post",
    path: "/api/workout",
    validators: [
        authorize,
        body("comment").isLength({ max: 255 })
    ],
    handler: async (req: Request, res: Response) => {
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: {},
            execute: async () => {
                const repository = new WorkoutRepository

                const user = await prisma.user.findFirst({
                    where: {
                        email: res.locals.userEmail,
                    }
                })
                if (!user) {
                    throw {
                        status: StatusCodes.NOT_FOUND,
                        message: ReasonPhrases.NOT_FOUND,
                        isCustomError: true,
                    } as TCustomError
                }
                const { date, comment, results } = req.body

                return await repository.create(date, user.id, results, comment)
            },
        })
    }
} as TRoute
