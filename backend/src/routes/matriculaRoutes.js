import { Router } from "express";
import { matriculaController } from "../controllers/matriculaController.js";

const router = Router();
router.get("/", matriculaController.listar);
router.post("/", matriculaController.criar);
router.put("/:id", matriculaController.atualizar);
router.delete("/:id", matriculaController.remover);

export default router;
