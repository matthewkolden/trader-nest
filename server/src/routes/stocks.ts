import express, { Router } from "express";
import { dataController, apiController } from "../controllers/stocks";

const stockRouter: Router = express.Router();

// Index
stockRouter.get("/", dataController.index, apiController.index);
// Delete
stockRouter.delete("/:id", dataController.destroy, apiController.show);
// Update
stockRouter.put("/:id", dataController.update, apiController.show);
// Create
stockRouter.post("/", dataController.create, apiController.show);
// Show
stockRouter.get("/:id", dataController.show, apiController.show);

export default stockRouter;
