import { planoService } from "../services/planoService.js";

export const planoController = {
  listar(req, res) {
    res.json(planoService.listar());
  },

  buscarPorId(req, res) {
    res.json(planoService.buscarPorId(req.params.id));
  },

  criar(req, res) {
    res.status(201).json(planoService.criar(req.body));
  },
  atualizar(req, res) {
    res.json(planoService.atualizar(req.params.id, req.body));
  },
  remover(req, res) {
    planoService.remover(req.params.id);
    res.status(204).end();
  },
};
