
import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { TRoute } from '../types'
import { TCustomError, handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { body } from 'express-validator'
import { WorkoutRepository } from '../../repositories/workout/WorkoutRepository'
import { prisma } from '../../database'

export default {
    method: "put",
    path: "/api/workout/:id",
    validators: [
        authorize,
        body("comment").isLength({ max: 255 })
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                const repository = new WorkoutRepository
                const workoutId = parseInt(req.params.id)

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

                const exWorkout = await repository.getById(workoutId)
                if (exWorkout?.userId !== user.id) {
                    throw {
                        status: StatusCodes.NOT_FOUND,
                        message: ReasonPhrases.FORBIDDEN,
                        isCustomError: true,
                    } as TCustomError
                }
                const { date, comment, results } = req.body

                return await repository.update(workoutId, date, results, comment)
            },
        }),
} as TRoute
