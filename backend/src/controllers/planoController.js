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
};
