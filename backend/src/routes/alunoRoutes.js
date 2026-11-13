import { Router } from "express";
import { alunoController } from "../controllers/alunoController.js";

const router = Router();
router.get("/", alunoController.listar);
router.get("/:id", alunoController.buscarPorId);
router.post("/", alunoController.criar);

export default router;
