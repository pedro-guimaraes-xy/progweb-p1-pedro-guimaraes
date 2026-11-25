import { db } from "../db.js";

// Mesmo contrato da S3 (listar, buscarPorId, existeCpf, inserir,
// atualizar, remover). Só o "como" mudou: o array virou tabela.
export const clienteModel = {
  listar() {
    return db.prepare("SELECT * FROM clientes ORDER BY id").all();
  },

  buscarPorId(id) {
    return db.prepare("SELECT * FROM clientes WHERE id = ?").get(id) ?? null;
  },

  existeCpf(cpf) {
    const linha = db.prepare("SELECT 1 FROM clientes WHERE cpf = ?").get(cpf);
    return linha !== undefined;
  },

  inserir({ nome, cpf, email }) {
    const r = db
      .prepare("INSERT INTO clientes (nome, cpf, email) VALUES (?, ?, ?)")
      .run(nome, cpf, email ?? null);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare(
      "UPDATE clientes SET nome = ?, cpf = ?, email = ? WHERE id = ?",
    ).run(novo.nome, novo.cpf, novo.email ?? null, id); // o id nunca muda
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare("DELETE FROM clientes WHERE id = ?").run(id);
    return r.changes > 0; // true = removeu
  },
};
