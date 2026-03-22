import type { Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import { number, success } from "zod";

// fn get All Information user
async function listManagement(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
      },
    });
    res.status(200).json({ message: " successfuly ", date: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
// fn update enable ===> ( true and false )
async function createManagement(req: Request, res: Response) {
  try {
    const { id, enabled } = req.body;
    const updateUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        enabled: enabled,
      },
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
      },
    });
    res
      .status(200)
      .json({ message: "Update enabled successfuly", data: updateUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
// fn update role ===> ( user and admin )
async function createRoleManagement(req: Request, res: Response) {
  try {
    const { id, role } = req.body;
    const updateRole = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        role: role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
      },
    });
    res
      .status(200)
      .json({ message: "Update enabled successfuly", data: updateRole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}

interface CartItem {
  id: number;
  count: number;
  price: number;
}
//fn createCart and sumTotal
async function createCartManagement(req: Request, res: Response) {
  try {
    const { cart }: { cart: CartItem[] } = req.body;
    console.log(cart);
    console.log(req.user.id); //เราใช้ token ใครเข้าสู่ระบบตอนนี้

    const user = await prisma.user.findFirst({
      where: {
        id: Number(req.user.id), // เรา id หรือ token ใครในการเข้าสู่ระบบตอนนี้ไปหาที่มาจาก middlewares ❗️
      },
    });
    // console.log("user.id----->", user);

    //ตรวจว่า user ที่เราไปหามานั่นมีตัวตนจริงไหม
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //Check quantity
    for (const item of cart) {
      // console.log(item)
      const product = await prisma.product.findUnique({
        where: { id: item.id },
        select: { quantity: true, title: true },
      });
      // console.log(product)

      //ใช้งานใน for loop ในดารเข้าถึงข้อมูล product
      if (!product || item.count > product.quantity) {
        return res.status(400).json({
          success: false,
          message: `ขออภัย สินค้า ${product?.title || "product"} หมด `,
        });
      }
    }

    //Deleted old Cart item
    await prisma.productOnCart.deleteMany({
      where: {
        cart: {
          orderedById: user.id,
        },
      },
    });
    //Delete old Cart
    await prisma.cart.deleteMany({
      where: { orderedById: user.id },
    });

    //เตรียมสินค้าในการคำนวณ
    let products = cart.map((item) => ({
      product: {
        connect: { id: item.id },
      },
      count: item.count,
      price: item.price,
    }));
    // console.log(products)

    let carTotal = products.reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    ); //หาผลรวมของราคา reduce
    // console.log(carTotal)

    // New Cart
    const newCart = await prisma.cart.create({
      data: {
        products: {
          create: products,
        },
        carTotal: carTotal,
        orderedById: user.id,
      },
    });
    console.log(newCart);
    res.status(200).json({ message: "createCartManagement" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
// fn List Cart product
async function listCartManagement(req: Request, res: Response) {
  try {
    // req.user.id
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: Number(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    console.log(cart);
    res
      .status(200)
      .json({
        message: "listCartManagement",
        products: cart?.products,
        cartTotal: cart?.carTotal,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
//fn delete productOnCart and  cart
async function deleteCartManagement(req: Request, res: Response) {
  try {
    //ไปหาของในตะกร้าก่อน
    const cart = await prisma.cart.findFirst({
      where: { orderedById: Number(req.user.id) },
    });
    if (!cart) {
      return res.status(400).json({ message: "No cart" });
    }
    //ถ้าเจอของในตะกร้าที่ผมต้องการลบฉันก็ ลบ เลยจัดการ
    await prisma.productOnCart.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
    const result = await prisma.cart.deleteMany({
      where: { orderedById: Number(req.user.id) },
    });
    console.log(cart);
    res
      .status(200)
      .json({ message: "deleteCart Success", deleteCount: result.count }); //บอกด้วยลบไปเท่าไหร่
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
// fn update address uest in datebase Now?????
async function addUserAddressManagement(req: Request, res: Response) {
  try {
    const { address } = req.body;
    const addressUser = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        address: address,
      },
    });
    res.status(200).json({ message: "addUserAddress Success"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}

async function addOrderManagement(req: Request, res: Response) {
  try {
    //Step 0 check Stripe
    // console.log(req.body)
    // return res.send('hello Jukkru!!!')
    // stripePaymentId String
    // amount          Int
    // status          String
    // currentcy       String
    const { id, amount, status, currency } = req.body.paymentIntent;
    console.log('payment' , amount)

    //step 1 Get User Cart
    const userCatt = await prisma.cart.findFirst({
      where: {
        orderedById: Number(req.user.id),
      },
      include: { products: true },
    });

    // console.log("cart:", userCatt)

    // Check  Cart empty
    if (!userCatt || userCatt.products.length === 0) {
      return res.status(400).json({ message: "Not Found data" });
    }
    
    const amountTHB = Number(amount) / 100 ;
    //creat a new order
    const order = await prisma.order.create({
      data: {
        products: {
          create: userCatt.products.map((item) => ({
            productId: item.productId,
            count: item.count,
            price: item.price,
          })),
        },
        orderedBy: {
          connect: { id: req.user.id },
        },
        cartTotal: userCatt.carTotal,
        stripePaymentId: id,
        amount: amountTHB,
        status: status,
        currency: currency
      },
    });

    // Update Product
    const update = userCatt.products.map((item) => ({
      where: { id: item.productId },
      data: {
        quantity: { decrement: item.count },
        sold: { increment: item.count },
      },
    }));
    console.log(update);

    await Promise.all(
      // Promise all คือทำงานทั้งหมดเลยไม่ต้องรองี้มั้ง
      update.map((updated) => prisma.product.update(updated)),
    );

    await prisma.cart.deleteMany({
      where: { orderedById: Number(req.user.id) },
    });

    res.status(200).json({ message: "successfuly" , data: order});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
// fn list การเข้าถึงข้อมูล order --> products ---> product มาแสดง
async function listOrderManagement(req: Request, res: Response) {
  try {
    const orders = await prisma.order.findMany({
      where: { orderedById : Number(req.user.id) },
      include:{
        products:{
          include:{
            product: true
          }
        }
      }
    })
    if (orders.length === 0 ){
      return res.status(400).json({message: 'Not Found Order' })
    }
    res.status(200).json({ message: "listOrderManagement" , data: orders});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}

export const userControllers = {
  listManagement,
  createManagement,
  createRoleManagement,
  createCartManagement,
  listCartManagement,
  deleteCartManagement,
  addUserAddressManagement,
  addOrderManagement,
  listOrderManagement,
};
