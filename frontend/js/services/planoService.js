import { api } from "../api.js";

function preparar({ nome, valorMensal, duracaoMeses }) {
  const dados = {
    nome: (nome ?? "").trim(),
    valorMensal: Number(valorMensal),
    duracaoMeses: Number(duracaoMeses),
  };
  if (!dados.nome) throw new Error("Informe o nome do plano.");
  if (valorMensal === "" || Number.isNaN(dados.valorMensal)) {
    throw new Error("Informe o valor mensal em números.");
  }
  if (duracaoMeses === "" || Number.isNaN(dados.duracaoMeses)) {
    throw new Error("Informe a duração em meses.");
  }
  return dados;
}

export const planoService = {
  listar() {
    return api.get("/planos");
  },

  async criar(dados) {
    return api.post("/planos", preparar(dados));
  },
  atualizar(id, dados) {
    return api.put(`/planos/${id}`, preparar(dados));
  },
  remover(id) {
    return api.delete(`/planos/${id}`);
  },
};
