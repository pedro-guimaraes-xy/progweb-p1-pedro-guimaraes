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

  atualizar(req, res) {
    res.json(alunoService.atualizar(req.params.id, req.body));
  },

  remover(req, res) {
    alunoService.remover(req.params.id);
    res.status(204).end();
  },
};
