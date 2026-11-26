import { alunoModel } from "../models/alunoModel.js";
import { ErroApp } from "../utils/erro.js";
import { matriculaModel } from "../models/matriculaModel.js";

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

  atualizar(id, dados) {
    if (!dados.nome || !dados.email) {
      throw new ErroApp("Nome e e-mail são obrigatórios", 400);
    }
    const aluno = alunoModel.atualizar(Number(id), dados);
    if (!aluno) throw new ErroApp("Aluno não encontrado", 404);
    return aluno;
  },

  remover(id) {
    if (matriculaModel.listarPorAluno(Number(id)).length > 0) {
      throw new ErroApp(
        "Aluno possui matrículas. Remova as matrículas primeiro.",
        409,
      );
    }
    const removido = alunoModel.remover(Number(id));
    if (!removido) throw new ErroApp("Aluno não encontrado", 404);
  },
};
