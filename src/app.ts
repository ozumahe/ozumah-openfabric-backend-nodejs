require("dotenv").config();
import "reflect-metadata";
import "express-async-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// REST OF THE PACKAGES
import morgan from "morgan";

//ROUTES
import { paymentRouter, authRouter } from "../src/routes";
import { AppDataSource } from "./data-source";
import errorHandlerMiddleware from "./middleware/error-handler";
import { jwtSecret } from "./utils/jwt";

const app: Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Testing the Server");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/payment", paymentRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
