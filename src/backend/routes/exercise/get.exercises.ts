import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'

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
                const exercises = prisma.exercise.findMany()

                return exercises
            },
        }),
} as TRoute
