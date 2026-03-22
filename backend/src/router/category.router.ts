import express, { Router } from 'express'
import { categoryControllers } from '../controllers/category.controllers.js'
import { adminCheck, authCheck } from '../middlewares/authcheck.js'

export const categoryRouter: Router = express.Router()

categoryRouter.post('/category' ,authCheck , adminCheck,categoryControllers.categoryAdd)// Only admin can add information ❗️
categoryRouter.get('/category' ,categoryControllers.categoryList)
categoryRouter.delete('/category/:id' ,authCheck,adminCheck,categoryControllers.categoryDeleteId)