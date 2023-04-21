import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connect } from "./config/db";
import stockRouter from "./routes/stocks";
import userRouter from "./routes/users";
import checkToken from "./config/checkToken";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.data = {};
  next();
});

app.use(checkToken);
app.use("/api/stocks", stockRouter);
app.use("/api/users", userRouter);

app.get("/api/test", (req, res) => {
  res.json({ test: "the api is working" });
});

app.listen(PORT, async () => {
  console.log(`Express app running on port ${PORT}`);
  await connect();
});
