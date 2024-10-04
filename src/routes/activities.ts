import { Router } from "express";
import { activities } from "../controllers/activities";

const router = Router();

router.post("/:shareId", activities);

export default router;
