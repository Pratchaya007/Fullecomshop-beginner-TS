import express, { Router } from 'express'
import { adminControllers } from '../controllers/admin.controllers.js'
import { authCheck } from '../middlewares/authcheck.js'

export const adminRouter: Router  = express.Router()

adminRouter.put('/user/order', authCheck ,adminControllers.updateAdmin)
adminRouter.get('/admin/orders',authCheck,adminControllers.listAdmin)