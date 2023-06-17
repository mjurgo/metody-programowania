import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import loginUser from './user/login.user'

const router = express.Router()
router.get('/', (_, res) => {
    res.send('Example home page')
})

const apiRoutes = [getStatus, postUser, loginUser]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)

export default router
