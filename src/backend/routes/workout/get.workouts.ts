import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { TRoute } from '../types'
import { TCustomError, handleRequest } from '../../utils/request.utils'
import { WorkoutRepository } from '../../repositories/workout/WorkoutRepository'
import { authorize } from '../../utils/middleware.utils'
import { prisma } from '../../database'

export default {
    method: "get",
    path: "/api/workouts",
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
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
                        message: ReasonPhrases.FORBIDDEN,
                        isCustomError: true,
                    } as TCustomError
                }

                return repository.getAll(user.id)
            },
        }),
} as TRoute
