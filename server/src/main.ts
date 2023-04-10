import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connect } from "./config/db";
import router from "./routes/stocks";

const PORT = process.env.PORT || 3001;

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

app.use("/api/stocks", router);

app.get("/api/test", (req, res) => {
  res.json({ test: "the api is working" });
});

app.listen(PORT, async () => {
  console.log(`Express app running on port ${PORT}`);
  await connect();
});
