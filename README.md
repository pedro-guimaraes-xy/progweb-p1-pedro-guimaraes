# Academia Manager

Sistema web para gerenciar uma academia: cadastro de alunos, planos e matrículas.
Projeto 1 da disciplina Programação Web (UEPB, 2026.2).

- **Aplicação:** (em breve)
- **API:** (em breve)
- **Vídeo de apresentação:** (em breve)

> A API ficará no plano grátis do Render: o primeiro acesso pode levar cerca de
> um minuto, e os dados voltam aos de exemplo a cada reinício do serviço.

## Tecnologias

- Backend: Node.js 22+, Express 5, SQLite (`node:sqlite`, SQL puro)
- Frontend: HTML, CSS, Bootstrap 5, JavaScript puro (ES Modules, `fetch`)

## Como rodar localmente

Pré-requisito: Node.js 22 ou superior.

```bash
# 1. API
cd backend
npm install
cp .env.example .env      # no PowerShell: Copy-Item .env.example .env
npm run dev               # http://localhost:3000

# 2. Frontend (em outro terminal)
cd frontend
npx http-server -p 5500 -c-1     # http://localhost:5500
```

## Rotas da API

| Método | Rota            | O que faz              | Respostas          |
| ------ | --------------- | ---------------------- | ------------------ |
| GET    | /alunos         | Lista os alunos        | 200                |
| GET    | /alunos/:id     | Busca um aluno         | 200, 404           |
| POST   | /alunos         | Cria um aluno          | 201, 400           |
| PUT    | /alunos/:id     | Atualiza um aluno      | 200, 400, 404      |
| DELETE | /alunos/:id     | Remove um aluno        | 204, 404, 409      |
| GET    | /planos         | Lista os planos        | 200                |
| GET    | /planos/:id     | Busca um plano         | 200, 404           |
| POST   | /planos         | Cria um plano          | 201, 400, 422      |
| PUT    | /planos/:id     | Atualiza um plano      | 200, 400, 404, 422 |
| DELETE | /planos/:id     | Remove um plano        | 204, 404, 409      |
| GET    | /matriculas     | Lista as matrículas    | 200                |
| POST   | /matriculas     | Cria uma matrícula     | 201, 400, 404, 409 |
| PUT    | /matriculas/:id | Atualiza uma matrícula | 200, 400, 404, 409 |
| DELETE | /matriculas/:id | Remove uma matrícula   | 204, 404           |

Erros seguem o formato `{ "erro": "mensagem" }`.

## Regras de negócio

- Aluno exige nome e e-mail (400).
- Plano exige nome, valor mensal e duração em meses (400); valor e duração devem ser maiores que zero (422).
- Matrícula exige `alunoId` e `planoId` (400), e os dois precisam existir (404).
- Um aluno não pode ter duas matrículas ativas (409).
- Aluno com matrículas não pode ser removido (409).

## Estrutura

```
backend/
  src/
    routes/        mapeia URL → controller
    controllers/   lê a requisição, chama o service, responde
    services/      regras de negócio
    models/        acesso ao banco (SQL)
    middleware/    logger e tratamento de erros
    db.js          conexão, schema e dados de exemplo do SQLite
frontend/
  js/
    api.js         camada HTTP (fetch)
    services/      regras da tela
    state/         estado da aplicação
    ui/            desenho da tela
MODELAGEM.md       modelagem de classes (S2)
s1/ … s4/          exercícios das semanas
```

## Autor

Pedro Henrique Almeida Guimarães · UEPB

Regra adicional: planos vinculados a matrículas não podem ser removidos (409).
