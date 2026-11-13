import { planoModel } from "../models/planoModel.js";
import { ErroApp } from "../utils/erro.js";

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
    if (!dados.nome || dados.valorMensal === undefined || !dados.duracaoMeses) {
      throw new ErroApp(
        "Nome, valor mensal e duração em meses são obrigatórios",
        400,
      );
    }
    if (Number(dados.valorMensal) <= 0 || Number(dados.duracaoMeses) <= 0) {
      throw new ErroApp("Valor e duração devem ser maiores que zero", 422);
    }
    return planoModel.criar(dados);
  },
};
