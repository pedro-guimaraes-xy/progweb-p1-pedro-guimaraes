import { api } from "../api.js";

function preparar({ alunoId, planoId }) {
  if (!alunoId) throw new Error("Selecione o aluno.");
  if (!planoId) throw new Error("Selecione o plano.");
  return { alunoId: Number(alunoId), planoId: Number(planoId) };
}

export const matriculaService = {
  listar() {
    return api.get("/matriculas");
  },

  async criar(dados) {
    return api.post("/matriculas", preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/matriculas/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/matriculas/${id}`);
  },
};
