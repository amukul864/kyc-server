import { Router } from "express";
import { users } from "../controllers/users";

const router = Router();

router.get("/:shareId", users);

export default router;
