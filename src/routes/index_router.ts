import { Router } from "express";
import {getResponse} from "../controllers/getResponse";

const router = Router();

// GET /api/hello
router.get("/getResponse", getResponse);

export default router;
