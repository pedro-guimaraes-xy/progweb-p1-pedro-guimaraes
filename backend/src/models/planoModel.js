let planos = [];
let proximoId = 1;

export const planoModel = {
  listarTodos() {
    return planos;
  },
  buscarPorId(id) {
    return planos.find((p) => p.id === id);
  },
  criar(dados) {
    const novo = {
      id: proximoId++,
      nome: dados.nome,
      valorMensal: Number(dados.valorMensal),
      duracaoMeses: Number(dados.duracaoMeses),
    };
    planos.push(novo);
    return novo;
  },
};
