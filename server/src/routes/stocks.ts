import express, { Router } from "express";
import { dataController, apiController } from "../controllers/stocks";

const router: Router = express.Router();

router.use((req, res, next) => {
  res.locals.data = {};
  next();
});

// Index
router.get("/", dataController.index, apiController.index);
// Delete
router.delete("/:id", dataController.destroy, apiController.show);
// Update
router.put("/:id", dataController.update, apiController.show);
// Create
router.post("/", dataController.create, apiController.show);
// Show
router.get("/:id", dataController.show, apiController.show);

export default router;
