import { db } from "../db.js";

// No banco: snake_case (valor_mensal). Na API: camelCase (valorMensal).
// O AS traduz aqui, na única camada que conhece o banco.
const COLUNAS = `id, nome,
  valor_mensal AS valorMensal, duracao_meses AS duracaoMeses`;

export const planoModel = {
  listarTodos() {
    return db.prepare(`SELECT ${COLUNAS} FROM planos ORDER BY id`).all();
  },

  buscarPorId(id) {
    return (
      db.prepare(`SELECT ${COLUNAS} FROM planos WHERE id = ?`).get(id) ?? null
    );
  },

  criar(dados) {
    const r = db
      .prepare(
        "INSERT INTO planos (nome, valor_mensal, duracao_meses) VALUES (?, ?, ?)",
      )
      .run(dados.nome, Number(dados.valorMensal), Number(dados.duracaoMeses));
    return this.buscarPorId(Number(r.lastInsertRowid));
  },
};
