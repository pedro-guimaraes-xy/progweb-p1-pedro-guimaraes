import { api } from "../api.js";

function preparar({ nome, email }) {
  const dados = {
    nome: (nome ?? "").trim(),
    email: (email ?? "").trim(),
  };
  if (!dados.nome) throw new Error("Informe o nome.");
  if (!dados.email) throw new Error("Informe o e-mail.");
  return dados;
}

export const alunoService = {
  listar() {
    return api.get("/alunos");
  },

  async criar(dados) {
    return api.post("/alunos", preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/alunos/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/alunos/${id}`);
  },
};
