let matriculas = [];
let proximoId = 1;

export const matriculaModel = {
  listarTodas() {
    return matriculas;
  },

  buscarPorId(id) {
    return matriculas.find((m) => m.id === id);
  },

  buscarAtivaPorAluno(alunoId) {
    return matriculas.find(
      (m) => m.alunoId === alunoId && m.status === "ativa",
    );
  },

  criar(dados) {
    const nova = {
      id: proximoId++,
      alunoId: Number(dados.alunoId),
      planoId: Number(dados.planoId),
      dataInicio: new Date().toISOString().split("T")[0],
      status: "ativa",
    };
    matriculas.push(nova);
    return nova;
  },

  atualizar(id, dados) {
    const matricula = matriculas.find((m) => m.id === id);
    if (!matricula) return null;
    matricula.alunoId = Number(dados.alunoId);
    matricula.planoId = Number(dados.planoId);
    return matricula;
  },

  remover(id) {
    const indice = matriculas.findIndex((m) => m.id === id);
    if (indice === -1) return false;
    matriculas.splice(indice, 1);
    return true;
  },
};
