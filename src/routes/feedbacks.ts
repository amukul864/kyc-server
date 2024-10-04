import { Router } from "express";
import { disagreements, feedbacks, getFeedbacks } from "../controllers/feedbacks";

const router = Router();

router.post("/:shareId", feedbacks);
router.get("/:shareId", getFeedbacks);
router.post("/disagreements/:shareId", disagreements);

export default router;
