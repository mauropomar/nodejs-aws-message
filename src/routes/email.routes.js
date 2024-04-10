import { Router } from "express";
import {
    sendEmail
} from "../controllers/email.controllers.js";

// rutes
const router = Router();

router.post("/", sendEmail);
router.post("/sdk", sendEmail);

export default router;