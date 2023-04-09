import dotenv from "dotenv";
dotenv.config();
import { db } from './config/db'
import express from "express";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
  res.locals.data = {}
  next()
})

app.get('/api/test', (req, res) => {
  res.json({ test: 'the api is working' })
})

db.on('connected', function () {
  app.listen(PORT, function () {
    console.log(`Express app running on port ${PORT}`)
  })
})
