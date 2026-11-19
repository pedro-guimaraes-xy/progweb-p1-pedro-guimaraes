import { Router } from "express";
import { planoController } from "../controllers/planoController.js";

const router = Router();
router.get("/", planoController.listar);
router.get("/:id", planoController.buscarPorId);
router.post("/", planoController.criar);

export default router;
