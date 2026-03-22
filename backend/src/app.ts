import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.config.js";
import { authRouter } from "./router/auth.router.js";
import { categoryRouter } from "./router/category.router.js";
import { productRouter } from "./router/product.router.js";
import { adminRouter } from "./router/admin.router.js";
import { userRouter } from "./router/user.router.js";
import { paymentRouter } from "./router/stripe.router.js";

const app = express();

app.use(cors({ origin: [env.FRONTEND_URL], credentials: true }));
app.use(express.json({limit: '20mb'}));
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", adminRouter);
app.use("/api" , userRouter)
app.use("/api", paymentRouter)

const PORT = env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is runnig of Port http://localhost:${PORT}`);
});
