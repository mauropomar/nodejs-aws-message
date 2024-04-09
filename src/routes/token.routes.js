import { Router } from "express";
import {
    generateToken
} from "../controllers/token.controllers.js";

// rutes
const router = Router();
router.post("/", generateToken);

export default router;