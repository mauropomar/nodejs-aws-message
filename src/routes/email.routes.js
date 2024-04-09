import { Router } from "express";
import {
    sendEmail,
    sendEmailRest
} from "../controllers/email.controllers.js";

// rutes
const router = Router();

router.post("/sendEmail", sendEmail);
router.post("/", sendEmailRest);

export default router;