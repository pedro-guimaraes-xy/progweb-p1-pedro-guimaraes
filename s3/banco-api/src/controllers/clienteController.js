import { clienteService } from "../services/clienteService.js";

export const clienteController = {
  listar(req, res) {
    res.json(clienteService.listar());
  },

  buscarPorId(req, res) {
    res.json(clienteService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const novo = clienteService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    res.json(clienteService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    clienteService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
