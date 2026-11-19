import { matriculaService } from "../services/matriculaService.js";

export const matriculaController = {
  listar(req, res) {
    res.json(matriculaService.listar());
  },

  criar(req, res) {
    res.status(201).json(matriculaService.criar(req.body));
  },
};
