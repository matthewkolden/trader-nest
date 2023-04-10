import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ticker: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export const StockModel = mongoose.model("Stocks", StockSchema);
