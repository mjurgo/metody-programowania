import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import loginUser from './user/login.user'
import postExercise from './exercise/post.exercise'
import getExercise from './exercise/get.exercise'
import getExercises from './exercise/get.exercises'
import deleteExercise from './exercise/delete.exercise'
import putExercise from './exercise/put.exercise'

const router = express.Router()
router.get('/', (_, res) => {
    res.send('Example home page')
})

const apiRoutes = [getStatus, postUser, loginUser, postExercise, getExercise, getExercises, deleteExercise, putExercise]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)

export default router
