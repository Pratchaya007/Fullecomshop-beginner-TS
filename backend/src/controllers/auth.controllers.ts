import type { Request, Response, RequestHandler } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";
import { prisma } from "../db/prisma.js";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { env } from "../config/env.config.js";

async function authRegister(req: Request, res: Response) {
  try {
    const { email, password } = registerSchema.parse(req.body); //role

    // Step 2 Check Email in DB already ?
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "Email already exits!!" });
    }

    const hashpassword = await argon2.hash(password);
    const cresteUser = await prisma.user.create({
      data: {
        email,
        password: hashpassword,
        //role : role
      },
      select: {
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.status(200).json({ message: "redister successfuly", data: cresteUser });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "validation error",
        error: err.flatten().fieldErrors,
      });
    }
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(409).json({ message: "Email already exits !!!!" });
    }
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
async function authLogin(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // step 1 ckeck email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.enabled)
      return res.status(400).json({ message: "user not found or not Enables" });

    // step 2 ckeck password
    if (!user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // step 3 create Payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    // step 4 Gennerate Token
    jwt.sign(
      payload,
      env.JWT_ACCESS_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Server is error" });
        }
        res.json({ payload, token });
      },
    );

    // console.log('Payload',payload)
    // res.status(200).json({message: 'ok login'})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}

// fn ค้นหา email ตาม decode ที่เราสร้างไว้แล้วเอาข้อมาโชว์
async function authcurrentuser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email
      },
      select:{
        id: true, 
        email: true ,
        name: true ,
        role: true
      }
    })
    res.status(200).json({ message: "Login successfuly ", data: user});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
// async function authcurrentadmin(req:Request, res: Response) {
//   try{

//   }catch (err){
//     console.log(err)
//     res.status(500).json({message: "Server is Error"})
//   }
// }

export const authControllers = { authLogin, authRegister, authcurrentuser };
