import { alunoService } from "../services/alunoService.js";

export const alunoController = {
  listar(req, res) {
    res.json(alunoService.listar());
  },

  buscarPorId(req, res) {
    res.json(alunoService.buscarPorId(req.params.id));
  },

  criar(req, res) {
    res.status(201).json(alunoService.criar(req.body));
  },
};
