import { Router } from "express";
import {
    sendEmail,
    sendMessage
} from "../controllers/message.controllers.js";

// rutes
const router = Router();

router.post("/sendEmail", sendEmail);
router.post("/sendMessage", sendMessage);

export default router;