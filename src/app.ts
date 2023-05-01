require("dotenv").config();
import "reflect-metadata";
import "express-async-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// REST OF THE PACKAGES
import morgan from "morgan";

//ROUTES
import { authRouter } from "../src/routes";
import errorHandlerMiddleware from "./middleware/error-handler";
import connectDB from "./db/connect";

const app: Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Testing the Server");
});

app.use("/api/v1/auth", authRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log("LLL");
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => console.log(`Server listing on Port ${PORT}...`));
  } catch (e) {
    console.log(e);
  }
};

start();
