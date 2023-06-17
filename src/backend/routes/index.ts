import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import loginUser from './user/login.user'
import postExercise from './exercise/post.exercise'
import getExercise from './exercise/get.exercise'
import getExercises from './exercise/get.exercises'
import deleteExercise from './exercise/delete.exercise'
import putExercise from './exercise/put.exercise'
import postWorkout from './workout/post.workout'
import getWorkout from './workout/get.workout'
import getWorkouts from './workout/get.workouts'
import deleteWorkout from './workout/delete.workout'
import putWorkout from './workout/put.workout'

const router = express.Router()
router.get('/', (_, res) => {
    res.send('Example home page')
})

const apiRoutes = [getStatus, postUser, loginUser, postExercise, getExercise, getExercises, deleteExercise, putExercise, postWorkout, putWorkout, getWorkout, getWorkouts, deleteWorkout]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)

export default router
