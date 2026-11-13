let matriculas = [];
let proximoId = 1;

export const matriculaModel = {
  listarTodas() {
    return matriculas;
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
};
