import { db } from "../db.js";

export const alunoModel = {
  listarTodos() {
    return db.prepare("SELECT * FROM alunos ORDER BY id").all();
  },

  buscarPorId(id) {
    return db.prepare("SELECT * FROM alunos WHERE id = ?").get(id) ?? null;
  },

  criar(dados) {
    const r = db
      .prepare("INSERT INTO alunos (nome, email) VALUES (?, ?)")
      .run(dados.nome, dados.email);
    return this.buscarPorId(Number(r.lastInsertRowid));
  },

  atualizar(id, dados) {
    const r = db
      .prepare("UPDATE alunos SET nome = ?, email = ? WHERE id = ?")
      .run(dados.nome, dados.email, id);
    if (r.changes === 0) return null;
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare("DELETE FROM alunos WHERE id = ?").run(id);
    return r.changes > 0;
  },
};
