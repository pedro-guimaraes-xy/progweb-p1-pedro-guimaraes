import { db } from "../db.js";

// No banco: snake_case. Na API: camelCase. O AS traduz aqui.
const COLUNAS = `id, aluno_id AS alunoId, plano_id AS planoId,
  data_inicio AS dataInicio, status`;

export const matriculaModel = {
  listarTodas() {
    return db.prepare(`SELECT ${COLUNAS} FROM matriculas ORDER BY id`).all();
  },

  buscarPorId(id) {
    return (
      db.prepare(`SELECT ${COLUNAS} FROM matriculas WHERE id = ?`).get(id) ??
      null
    );
  },

  buscarAtivaPorAluno(alunoId) {
    return (
      db
        .prepare(
          `SELECT ${COLUNAS} FROM matriculas
           WHERE aluno_id = ? AND status = 'ativa' LIMIT 1`,
        )
        .get(alunoId) ?? null
    );
  },

  listarPorAluno(alunoId) {
    return db
      .prepare(
        `SELECT ${COLUNAS} FROM matriculas WHERE aluno_id = ? ORDER BY id`,
      )
      .all(alunoId);
  },

  criar(dados) {
    const r = db
      .prepare(
        `INSERT INTO matriculas (aluno_id, plano_id, data_inicio, status)
         VALUES (?, ?, ?, 'ativa')`,
      )
      .run(
        Number(dados.alunoId),
        Number(dados.planoId),
        new Date().toISOString().split("T")[0],
      );
    return this.buscarPorId(Number(r.lastInsertRowid));
  },

  atualizar(id, dados) {
    const r = db
      .prepare("UPDATE matriculas SET aluno_id = ?, plano_id = ? WHERE id = ?")
      .run(Number(dados.alunoId), Number(dados.planoId), id);
    if (r.changes === 0) return null;
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare("DELETE FROM matriculas WHERE id = ?").run(id);
    return r.changes > 0;
  },
};
