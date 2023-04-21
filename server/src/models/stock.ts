import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ticker: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export const StockModel = mongoose.model("Stock", StockSchema);
