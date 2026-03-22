import express, { Router } from "express";
import { productControllers } from "../controllers/product.controllers.js";
import { adminCheck, authCheck } from "../middlewares/authcheck.js";

export const productRouter: Router = express.Router();

productRouter.post("/product", productControllers.createProduct);
productRouter.get("/products/:count", productControllers.listProductId);
productRouter.get("/product/:id", productControllers.readProduct);
productRouter.put("/product/:id", productControllers.updateProduct);
productRouter.delete("/product/:id", productControllers.deleteProductId);
productRouter.post("/productby", productControllers.createProductBy);
productRouter.post("/search/filters", productControllers.createsearch);

productRouter.post('/images',authCheck,adminCheck,productControllers.uploadimagesProdouct)
productRouter.post('/removeimages',authCheck,adminCheck,productControllers.removeimagesProdouct)
