import { contaService } from '../services/contaService.js';

export const contaController = {
  listar(req, res) {
    res.json(contaService.listar(req.query.clienteId));
  },

  buscarPorId(req, res) {
    res.json(contaService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const nova = contaService.criar(req.body);
    res.status(201).json(nova);
  },

  atualizar(req, res) {
    res.json(contaService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    contaService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
