import { Router } from "express";
import { workflows } from "../controllers/workflows";

const router = Router();

router.get("/:shareId", workflows);

export default router;
