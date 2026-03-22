import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { prisma } from "../db/prisma.js";

// fn check Token
export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const headerToken = req.headers.authorization;
    //ด่านแรกตรวจก่อนเลยว่ามีไหม Token นะ
    if (!headerToken) {
      return res.status(401).json({ message: "No Token , authorization" });
    }
    const token = headerToken.split(" ")[1]; //jwt มีข้อมูลสามส่วนเราต้องการส่วนที่ 1 เลยต้องเขียนแบบนี้ก็คือส่วนที่เรา login ไปนั่นละมีข้อมูลอะไรบ้าง
    // console.log(token) Token ที่ตัดเอาส่วน ( Decoded Payload )

    const decode = jwt.verify(token as string, env.JWT_ACCESS_SECRET);
    // console.log(decode) เป็นข้อมูล user in login website
    req.user = decode; //สร้าง decode ของ user พวก id email เป็นต้น
    // console.log(req.user) มารับค่า decode เฉยๆ

    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id, //ไปค้นหาว่ามี id นี้ตามที่เรามีข้อมูล decode นี้ไหมใน db ของเรา
      },
    });
    //enabled return
    if (!user?.enabled) {
      return res.status(400).json({ message: "This account cannot access" });
    }
    // console.log(user)
    // console.log('Hello middlewares')
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Token Invalid" });
  }
};

// fn check admin
export const adminCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.user; //ดึงข้อมูลที่เราสร้าง decode ไว้แล้วเอามาเช็คค่า

    const adminUser = await prisma.user.findFirst({//เช็คค่าว่ามีไหม email มีไหมใน db
      where: { email: email },
    });

    //ถ้าไม่เจออีเมล และ role ไม่เท่ากับ แอดมิน return
    if (!adminUser || adminUser.role !== "ADMIN") {
      return res.status(400).json({ message: "Invalid not admin" });
    }

    console.log("admin check", email);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Admin access denied" });
  }
};
