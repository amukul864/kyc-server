import { Router } from "express";
import { reports, validate } from "../controllers/links";

const router = Router();

router.get("/validate/:shareId", validate);
router.get("/reports/:shareId", reports);

export default router;
