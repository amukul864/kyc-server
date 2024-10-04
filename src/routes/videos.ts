import { Router } from "express";
import upload from "../utils/upload";
import { consent, scripts } from "../controllers/videos";

const router = Router();

router.post("/consent", upload.single("videoConsent"), consent);
router.get("/scripts", scripts);

export default router;
