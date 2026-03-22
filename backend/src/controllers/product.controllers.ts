import type { Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.config.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

async function createProduct(req: Request, res: Response) {
  try {
    const { title, description, price, sold, quantity, images, categoryId } =
      req.body;
    // console.log(title , description , price , sold , quantity , images)
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images
            .filter((item: any) => item?.asset_id)
            .map((item: any) => ({
              asset_id: item.asset_id,
              public_id: item.public_id,
              url: item.url,
              secure_url: item.secure_url,
            })),
        },
      },
    });
    res.status(200).json({ message: "createProduct", data: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
async function updateProduct(req: Request, res: Response) {
  try {
    const { title, description, price, quantity, images, categoryId } =
      req.body;
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid not Found " });
    }
    const getProduct = await prisma.product.findUnique({ where: { id } });
    if (!getProduct) {
      return res.status(400).json({ message: "Invalid information not found" });
    }
    // console.log(title , description , price , sold , quantity , images) create → ไม่ต้อง where ---> update,delete → ต้อง where❗️
    await prisma.image.deleteMany({
      //ต้องการลบรูปไปด้วย
      where: {
        productId: Number(req.params.id),
      },
    });
    const product = await prisma.product.update({
      where: { id },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.status(200).json({ message: "createProduct", date: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
async function listProductId(req: Request, res: Response) {
  try {
    const count = Number(req.params.count);
    if (isNaN(count)) {
      return res.status(400).json({ message: "Invalid not Found " });
    }
    const getProduct = await prisma.product.findMany({
      take: count,
      orderBy: { createdAt: "desc" },
      include: { category: true, images: true },
    });

    res.status(200).json({ message: "getProductId", data: getProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
async function readProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid not Found " });
    }
    const getProduct = await prisma.product.findFirst({
      where: { id },
      include: { category: true, images: true },
    });

    res.status(200).json({ message: "getProductId", data: getProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
async function deleteProductId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid not Found " });
    }
    //delete Images in cloudinary
    //step 1 ค้นหาสินค้า include images
    const product = await prisma.product.findFirst({
      where: {id},
      include:{ images: true}
    })
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    // console.log(product)
    //step 2 Promise all แบบรอฉันด้วย
    const deleteImage = product.images.map((image) => 
      new Promise((resoLve , reject) => {
        //delete in cloudinary
        cloudinary.uploader.destroy(image.public_id,(error,result) => {
          if( error) reject(error)
            else resoLve(result)
        })
      })
    )
    await Promise.all(deleteImage) //รอทำงานด้วย all

    const getProduct = await prisma.product.findUnique({ where: { id } });
    if (!getProduct) {
      return res.status(400).json({ message: "Invalid information not found" });
    }
    await prisma.product.delete({ where: { id } });

    res.status(200).json({ message: "deleteProduct successfuly " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
async function createProductBy(req: Request, res: Response) {
  try {
    const { sold, order, limit } = req.body;
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { [sold]: order },
      include: 
      { category: true, 
        images:true
      },
    });
    res.status(200).json({ message: "successfuly", data: products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}

// fn การค้นหาหรือการ search query in title with contains: in prisma and findMany + include ---> category , images
const handleQuery = async (req: Request, res: Response, query: string) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        title: {
          //contains ไปค้นหาใน title ให้หน่อยว่ามีแบบนี้ไหม
          contains: query,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json({ message: "successfuly", data: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
};
// fn query category in db with Array map id ค้นหาโดยใช้งานการ map
const handleCategory = async (
  req: Request,
  res: Response,
  categoryId: number[],
) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json({ message: "successfuly", data: products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
};
// fn query Price in db is show client with [ gte , lte ] ค้นหาในช่วงของราคา
const handlePrice = async (
  req: Request,
  res: Response,
  priceRange: number[],
) => {
  try {
    if (!priceRange || priceRange.length !== 2) {
      return res.status(400).json({
        message: "Price range must have 2 numbers",
      });
    }

    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0] as number,
          lte: priceRange[1] as number,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json({ message: "successfuly", data: products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
};

async function createsearch(req: Request, res: Response) {
  try {
    const { query, category, price } = req.body;
    if (query) {
      console.log("query===>", query);
      await handleQuery(req, res, query); //เราส่งที่เรารับมาจาก body ไปให้ handlequery นั่นประมวลผล
    }
    if (price) {
      console.log("Price -->", price);
      await handlePrice(req, res, price); //price Array ด้วยนะเวลาส่งไป
    }
    if (category) {
      console.log("category", category);
      await handleCategory(req, res, category); //category Array ด้วยนะเวลาส่งไป
    }
    // res.status(200).json({ message: "createsearch" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}

//cloudinary

// cloudinary.config({
//   cloud_name: env.CLOUDINARY_CLOUD_NAME,
//   api_key: env.CLOUDINARY_API_KEY,
//   api_secret: env.CLOUDINARY_API_SECRET,
// });
// Uploadfile push in cloudinary connect with create product ?
async function uploadimagesProdouct(req: Request, res: Response) {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: Date.now().toString(),
      resource_type: "auto",
      folder: "Ecom2026",
    });

    res.status(200).json({ message: "uploadimagesProdouct" , data: result});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}
// Deletefile in cloudinary 
async function removeimagesProdouct(req: Request, res: Response) {
  try {
    const { public_id } = req.body
    // console.log(public_id)
    cloudinary.uploader.destroy(public_id,() => {
      res.status(200).json({ message: "removeProdouct succeed"});
    })
    // res.status(200).json({ message: "removeimagesProdouct" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server is Error" });
  }
}

export const productControllers = {
  createProduct,
  deleteProductId,
  listProductId,
  readProduct,
  createProductBy,
  createsearch,
  updateProduct,
  uploadimagesProdouct,
  removeimagesProdouct,
};
