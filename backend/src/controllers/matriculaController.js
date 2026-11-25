import { matriculaService } from "../services/matriculaService.js";

export const matriculaController = {
  listar(req, res) {
    res.json(matriculaService.listar());
  },

  criar(req, res) {
    res.status(201).json(matriculaService.criar(req.body));
  },

  atualizar(req, res) {
    res.json(matriculaService.atualizar(req.params.id, req.body));
  },

  remover(req, res) {
    matriculaService.remover(req.params.id);
    res.status(204).end();
  },
};
