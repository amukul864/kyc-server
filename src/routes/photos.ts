import { Router } from "express";
import upload from "../utils/upload";
import { faceCompare, faceDetect, screenshots } from "../controllers/photos";

const router = Router();

router.post("/screenshots", upload.single("photoScreenshot"), screenshots);
router.post("/face-detect", upload.single("photoFace"), faceDetect);
router.post(
  "/face-compare",
  upload.fields([
    { name: "photoId", maxCount: 1 },
    { name: "photoConsent", maxCount: 1 },
  ]),
  faceCompare,
);

export default router;
