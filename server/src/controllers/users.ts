import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const checkToken = (req, res) => {
  console.log("req.user", req.user);
  res.json(req.exp);
};

const dataController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserModel.create(req.body);
      const token = createJWT(user);
      res.locals.data.user = user;
      res.locals.data.token = token;
      console.log(res.locals.user);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      res.locals.data.user = user;
      console.log(res.locals.data.user);
      res.locals.data.token = createJWT(user);
      console.log(res.locals.data.token);
      next();
    } catch (error) {
      res.status(400).json("Bad Credentials");
    }
  },
};

const apiController = {
  auth(req: Request, res: Response) {
    res.json(res.locals.data.token);
  },
};

export { checkToken, dataController, apiController };

/** Helper function */

function createJWT(user) {
  try {
    const token = jwt.sign({ user }, process.env.SECRET as string, {
      expiresIn: 86400,
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating JWT");
  }
}
