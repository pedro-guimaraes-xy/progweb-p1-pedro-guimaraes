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
