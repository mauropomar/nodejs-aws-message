import { Router } from "express";
import {
    sendMessage,
} from "../controllers/sms.controllers.js";

// rutes
const router = Router();

router.post("/", sendMessage);
router.post("/sdk", sendMessage);

export default router;