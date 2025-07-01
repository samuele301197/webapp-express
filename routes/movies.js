import express from "express";
import moviesController from "../controllers/moviesController.js";

const router = express.Router();

router.get("/", moviesController.index);
router.get("/:id", moviesController.show);
router.post("/:id/reviews", moviesController.storeReview)

export default router;