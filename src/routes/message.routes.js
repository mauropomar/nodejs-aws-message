import { Router } from "express";
import {
    sendMessage,
    sendEmail,
} from "../controllers/index.js";

// rutes
const router = Router();

router.post("/sendMessage", sendMessage);
router.post("/sendEmail", sendEmail);

export default router;