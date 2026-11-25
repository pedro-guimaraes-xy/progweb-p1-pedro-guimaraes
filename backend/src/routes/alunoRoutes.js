import { Router } from "express";
import { alunoController } from "../controllers/alunoController.js";

const router = Router();
router.get("/", alunoController.listar);
router.get("/:id", alunoController.buscarPorId);
router.post("/", alunoController.criar);
router.put("/:id", alunoController.atualizar);
router.delete("/:id", alunoController.remover);

export default router;
