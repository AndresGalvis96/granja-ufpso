import { Router } from "express";
import { verifyToken } from "./token.middleware.js";


const router = Router();

router.use("/luegoXD", verifyToken);

export default router;