import { alunoModel } from "../models/alunoModel.js";
import { ErroApp } from "../utils/erro.js";

export const alunoService = {
  listar() {
    return alunoModel.listarTodos();
  },

  buscarPorId(id) {
    const aluno = alunoModel.buscarPorId(Number(id));
    if (!aluno) throw new ErroApp("Aluno não encontrado", 404);
    return aluno;
  },

  criar(dados) {
    if (!dados.nome || !dados.email) {
      throw new ErroApp("Nome e e-mail são obrigatórios", 400);
    }
    return alunoModel.criar(dados);
  },
};
