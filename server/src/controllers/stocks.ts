import { StockModel } from "../models/stock";
import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";

const dataController = {
  // Index: Getting all stocks
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundStocks = await StockModel.find({ user: req.query.user });
      res.locals.data.stocks = foundStocks;
      next();
    } catch (error: unknown) {
      res.status(404).send({
        msg: (error as Error).message,
      });
    }
  },
  // Show: Get a single stock
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundStock = await StockModel.findById(req.params.id);
      res.locals.data.stock = foundStock;
      next();
    } catch (error: unknown) {
      res.status(404).send({
        msg: (error as Error).message,
        output: "Could not find a stock with that ID",
      });
    }
  },
  // Create: Creating a new stock
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdStock = await StockModel.create(req.body);
      const user = req.body.user
        ? await UserModel.findById(req.body.user)
        : null;
      if (user) {
        user.stocks.push(createdStock._id);
        await user.save();
      }
      res.locals.data.stock = createdStock;
      next();
    } catch (error: unknown) {
      res.status(404).send({
        msg: (error as Error).message,
      });
    }
  },
  // Delete: Deleting a stock
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedStock = await StockModel.findByIdAndDelete(req.params.id);
      res.locals.data.stock = deletedStock;
      next();
    } catch (error: unknown) {
      res.status(404).send({
        msg: (error as Error).message,
      });
    }
  },
  // Update: Updating a stock
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedStock = await StockModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.locals.data.stock = updatedStock;
      next();
    } catch (error: unknown) {
      res.status(404).send({
        msg: (error as Error).message,
        output: "Could not find a stock with that ID",
      });
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.stocks);
    next();
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.stock);
    next();
  },
};

export { dataController, apiController };
