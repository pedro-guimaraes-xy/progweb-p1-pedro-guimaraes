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
  atualizar(id, dados) {
    const aluno = alunos.find((a) => a.id === id);
    if (!aluno) return null;
    aluno.nome = dados.nome;
    aluno.email = dados.email;
    return aluno;
  },
  remover(id) {
    const indice = alunos.findIndex((a) => a.id === id);
    if (indice === -1) return false;
    alunos.splice(indice, 1);
    return true;
  },
};
