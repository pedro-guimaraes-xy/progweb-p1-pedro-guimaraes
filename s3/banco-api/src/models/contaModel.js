import { db } from "../db.js";

// No banco: snake_case (cliente_id). No JSON da API: camelCase (clienteId).
// O AS traduz aqui, na única camada que conhece o banco.
const COLUNAS = `id, tipo, saldo,
  cliente_id AS clienteId, criada_em AS criadaEm`;

export const contaModel = {
  listar() {
    return db.prepare(`SELECT ${COLUNAS} FROM contas ORDER BY id`).all();
  },

  listarPorCliente(clienteId) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM contas WHERE cliente_id = ? ORDER BY id`)
      .all(clienteId);
  },

  buscarPorId(id) {
    return (
      db.prepare(`SELECT ${COLUNAS} FROM contas WHERE id = ?`).get(id) ?? null
    );
  },

  inserir({ tipo, saldo, clienteId }) {
    const r = db
      .prepare(
        `INSERT INTO contas (tipo, saldo, cliente_id, criada_em)
                VALUES (?, ?, ?, ?)`,
      )
      .run(tipo, Number(saldo), Number(clienteId), new Date().toISOString());
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare(
      "UPDATE contas SET tipo = ?, saldo = ?, cliente_id = ? WHERE id = ?",
    ).run(novo.tipo, Number(novo.saldo), Number(novo.clienteId), id);
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare("DELETE FROM contas WHERE id = ?").run(id);
    return r.changes > 0;
  },
};
