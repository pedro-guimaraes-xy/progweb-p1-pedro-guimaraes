import { matriculaModel } from "../models/matriculaModel.js";
import { alunoModel } from "../models/alunoModel.js";
import { planoModel } from "../models/planoModel.js";
import { ErroApp } from "../utils/erro.js";

export const matriculaService = {
  listar() {
    return matriculaModel.listarTodas();
  },

  criar(dados) {
    const { alunoId, planoId } = dados;
    if (!alunoId || !planoId) {
      throw new ErroApp("alunoId e planoId são obrigatórios", 400);
    }

    const aluno = alunoModel.buscarPorId(Number(alunoId));
    if (!aluno) throw new ErroApp("Aluno não encontrado", 404);

    const plano = planoModel.buscarPorId(Number(planoId));
    if (!plano) throw new ErroApp("Plano não encontrado", 404);

    // Regra de negócio: impedir que o mesmo aluno tenha duas matrículas ativas
    const matriculaAtiva = matriculaModel.buscarAtivaPorAluno(Number(alunoId));
    if (matriculaAtiva) {
      throw new ErroApp("Este aluno já possui uma matrícula ativa", 409);
    }

    return matriculaModel.criar({ alunoId, planoId });
  },

  atualizar(id, dados) {
    const { alunoId, planoId } = dados;
    if (!alunoId || !planoId) {
      throw new ErroApp("alunoId e planoId são obrigatórios", 400);
    }
    if (!alunoModel.buscarPorId(Number(alunoId))) {
      throw new ErroApp("Aluno não encontrado", 404);
    }
    if (!planoModel.buscarPorId(Number(planoId))) {
      throw new ErroApp("Plano não encontrado", 404);
    }

    const outraAtiva = matriculaModel.buscarAtivaPorAluno(Number(alunoId));
    if (outraAtiva && outraAtiva.id !== Number(id)) {
      throw new ErroApp("Este aluno já possui uma matrícula ativa", 409);
    }

    const matricula = matriculaModel.atualizar(Number(id), dados);
    if (!matricula) throw new ErroApp("Matrícula não encontrada", 404);
    return matricula;
  },

  remover(id) {
    const removida = matriculaModel.remover(Number(id));
    if (!removida) throw new ErroApp("Matrícula não encontrada", 404);
  },
};
