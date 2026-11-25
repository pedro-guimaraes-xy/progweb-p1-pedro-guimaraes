import { planoModel } from "../models/planoModel.js";
import { ErroApp } from "../utils/erro.js";

import { matriculaModel } from "../models/matriculaModel.js";

function validar(dados) {
  if (typeof dados.nome !== "string" || !dados.nome.trim() || dados.valorMensal == null || dados.duracaoMeses == null || dados.valorMensal === "" || dados.duracaoMeses === "") {
    throw new ErroApp("Nome, valor mensal e duração são obrigatórios", 400);
  }
  if (!Number.isFinite(Number(dados.valorMensal)) || Number(dados.valorMensal) <= 0 || !Number.isInteger(Number(dados.duracaoMeses)) || Number(dados.duracaoMeses) <= 0) {
    throw new ErroApp("Valor deve ser positivo e duração deve ser um inteiro positivo", 422);
  }
}

export const planoService = {
  listar() {
    return planoModel.listarTodos();
  },

  buscarPorId(id) {
    const plano = planoModel.buscarPorId(Number(id));
    if (!plano) throw new ErroApp("Plano não encontrado", 404);
    return plano;
  },

  criar(dados) {
    validar(dados);
    return planoModel.criar(dados);
  },
  atualizar(id, dados) {
    validar(dados);
    const plano = planoModel.atualizar(Number(id), dados);
    if (!plano) throw new ErroApp("Plano não encontrado", 404);
    return plano;
  },
  remover(id) {
    this.buscarPorId(id);
    if (matriculaModel.listarPorPlano(Number(id)).length) {
      throw new ErroApp("Plano possui matrículas. Remova as matrículas primeiro.", 409);
    }
    planoModel.remover(Number(id));
  },
};
