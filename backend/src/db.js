import { DatabaseSync } from "node:sqlite";

// O banco inteiro é um arquivo. Se não existir, o SQLite cria.
const arquivo = process.env.DB_FILE ?? "banco.db";
export const db = new DatabaseSync(arquivo);

// No SQLite a checagem de chave estrangeira vem desligada.
db.exec("PRAGMA foreign_keys = ON;");

db.exec(`
  CREATE TABLE IF NOT EXISTS alunos (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT NOT NULL,
    email TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS planos (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nome          TEXT NOT NULL,
    valor_mensal  REAL NOT NULL CHECK (valor_mensal > 0),
    duracao_meses INTEGER NOT NULL CHECK (duracao_meses > 0)
  );

  CREATE TABLE IF NOT EXISTS matriculas (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id    INTEGER NOT NULL REFERENCES alunos(id),
    plano_id    INTEGER NOT NULL REFERENCES planos(id),
    data_inicio TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'ativa'
  );
`);

const { total } = db.prepare("SELECT COUNT(*) AS total FROM alunos").get();
if (total === 0) {
  const dataHoje = new Date().toISOString().split("T")[0];

  const ana = db
    .prepare("INSERT INTO alunos (nome, email) VALUES (?, ?)")
    .run("Ana Silva", "ana@exemplo.com");
  const bruno = db
    .prepare("INSERT INTO alunos (nome, email) VALUES (?, ?)")
    .run("Bruno Costa", "bruno@exemplo.com");

  const mensal = db
    .prepare(
      "INSERT INTO planos (nome, valor_mensal, duracao_meses) VALUES (?, ?, ?)",
    )
    .run("Mensal", 99.9, 1);
  const trimestral = db
    .prepare(
      "INSERT INTO planos (nome, valor_mensal, duracao_meses) VALUES (?, ?, ?)",
    )
    .run("Trimestral", 89.9, 3);

  db.prepare(
    "INSERT INTO matriculas (aluno_id, plano_id, data_inicio, status) VALUES (?, ?, ?, 'ativa')",
  ).run(ana.lastInsertRowid, trimestral.lastInsertRowid, dataHoje);
}
