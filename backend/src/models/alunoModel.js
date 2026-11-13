let alunos = [];
let proximoId = 1;

export const alunoModel = {
  listarTodos() {
    return alunos;
  },
  buscarPorId(id) {
    return alunos.find((a) => a.id === id);
  },
  criar(dados) {
    const novo = { id: proximoId++, nome: dados.nome, email: dados.email };
    alunos.push(novo);
    return novo;
  },
};
