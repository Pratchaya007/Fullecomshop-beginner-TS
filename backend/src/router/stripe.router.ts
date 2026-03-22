import express, { Router } from 'express'
import { adminControllers } from '../controllers/admin.controllers.js'
import { authCheck } from '../middlewares/authcheck.js'
import { stripePayment } from '../controllers/payment.controllers.js'

export const paymentRouter: Router  = express.Router()

paymentRouter.post('/user/create-checkout-session',authCheck , stripePayment.payment)
