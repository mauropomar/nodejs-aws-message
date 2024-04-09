import { Router } from "express";
import {
    sendMessage,
} from "../controllers/sms.controllers.js";

// rutes
const router = Router();

router.post("/", sendMessage);

export default router;