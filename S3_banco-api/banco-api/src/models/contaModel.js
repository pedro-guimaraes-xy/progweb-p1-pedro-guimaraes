let contas = [];
let proximoId = 1;

export const contaModel = {
  listar() {
    return contas;
  },

  listarPorCliente(clienteId) {
    return contas.filter((c) => c.clienteId === clienteId);
  },

  buscarPorId(id) {
    return contas.find((c) => c.id === id) ?? null;
  },

  inserir({ tipo, saldo, clienteId }) {
    const nova = {
      id: proximoId++,
      tipo,
      saldo: Number(saldo),
      clienteId: Number(clienteId),
      criadaEm: new Date().toISOString(),
    };
    contas.push(nova);
    return nova;
  },

  atualizar(id, dados) {
    const i = contas.findIndex((c) => c.id === id);
    if (i === -1) return null;
    contas[i] = { ...contas[i], ...dados, id };
    return contas[i];
  },

  remover(id) {
    const antes = contas.length;
    contas = contas.filter((c) => c.id !== id);
    return contas.length < antes;
  },
};
