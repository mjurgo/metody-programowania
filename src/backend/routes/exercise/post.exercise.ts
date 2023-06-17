import { Request, Response } from 'express'
import { authorize } from '../../utils/middleware.utils'
import { body } from 'express-validator'
import { handleRequest } from '../../utils/request.utils'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'

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
                const { name, description } = req.body

                return await prisma.exercise.create({
                    data: {
                        name,
                        description,
                    }
                })
            },
        })
    }
} as TRoute
