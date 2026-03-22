import type { Request, Response } from "express";
import Stripe from "stripe";
import { env } from "../config/env.config.js";
import { prisma } from "../db/prisma.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

async function payment(req: Request, res: Response) {
  try {
    //check user
    //req.user.id

    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: req.user.id,
      },
    });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // console.log(cart)
    const amountTHB = cart.carTotal * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
  }
}

export const stripePayment = { payment };
