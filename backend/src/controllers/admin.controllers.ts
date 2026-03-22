import type { Request, Response } from "express";
import { prisma } from "../db/prisma.js";


// fn  updata id and address in order 
async function updateAdmin(req: Request, res: Response) {
  try {
    const { orderId, orderStatus } = req.body;
    // console.log(orderId,orderStatus)
    const orderUpdate = await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: orderStatus },
    });
    res.status(200).json({ message: "ok" , data: orderUpdate});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
// fn  admin getData และการเข้าถึงข้อมูลมาแสดงผล
async function listAdmin(req: Request, res: Response) {
  try {
    const orders = await prisma.order.findMany({
      include:{
        products: {
          include: {
            product: true
          }
        },
        orderedBy:{
          select:{
            id: true,
            email: true,
            address: true
          }
        }
      }
    })
    res.status(200).json({message: 'succees ', data: orders})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}

export const adminControllers = { updateAdmin, listAdmin };
