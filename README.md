# Academia Manager

O Academia Manager é um sistema web para facilitar o gerenciamento de uma academia. Nele é possível cadastrar, consultar, editar e excluir alunos, planos e matrículas.

Desenvolvi este sistema para o Projeto 1 da disciplina de Programação Web da UEPB (2026.2).

- **Aplicação:** https://progweb-p1-pedro-guimaraes-frontend.vercel.app
- **API:** https://p1-pedro-api.onrender.com
- **Vídeo de apresentação:** https://youtu.be/PNv6RuPHWYE

> O backend está hospedado no plano gratuito do Render. O primeiro acesso pode demorar cerca de um minuto. Como o disco não é persistente nesse plano, os dados cadastrados podem ser perdidos quando o serviço reiniciar e o banco será recriado com os dados de exemplo.

## Tecnologias

- Backend: Node.js 22+, Express 5, SQLite (`node:sqlite`, SQL puro)
- Frontend: HTML, CSS, Bootstrap 5, JavaScript puro (ES Modules, `fetch`)

## Como rodar localmente

Pré-requisito: Node.js 22 ou superior.

Abra o terminal na pasta do projeto e execute os comandos abaixo.

**1. Backend (PowerShell)**

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

A API estará em http://localhost:3000. No Linux ou macOS, use `cp .env.example .env` no lugar de `Copy-Item`.

**2. Frontend**

Abra outro terminal na raiz do projeto:

```bash
cd frontend
npx http-server -p 5500 -c-1
```

Acesse http://localhost:5500 no navegador.

## Rotas da API

| Método | Rota            | O que faz                          | Respostas          |
| ------ | --------------- | ---------------------------------- | ------------------ |
| GET    | /               | Verifica se a API está funcionando | 200                |
| GET    | /alunos         | Lista os alunos                    | 200                |
| GET    | /alunos/:id     | Busca um aluno                     | 200, 404           |
| POST   | /alunos         | Cria um aluno                      | 201, 400           |
| PUT    | /alunos/:id     | Atualiza um aluno                  | 200, 400, 404      |
| DELETE | /alunos/:id     | Remove um aluno                    | 204, 404, 409      |
| GET    | /planos         | Lista os planos                    | 200                |
| GET    | /planos/:id     | Busca um plano                     | 200, 404           |
| POST   | /planos         | Cria um plano                      | 201, 400, 422      |
| PUT    | /planos/:id     | Atualiza um plano                  | 200, 400, 404, 422 |
| DELETE | /planos/:id     | Remove um plano                    | 204, 404, 409      |
| GET    | /matriculas     | Lista as matrículas                | 200                |
| POST   | /matriculas     | Cria uma matrícula                 | 201, 400, 404, 409 |
| PUT    | /matriculas/:id | Atualiza uma matrícula             | 200, 400, 404, 409 |
| DELETE | /matriculas/:id | Remove uma matrícula               | 204, 404           |

Erros seguem o formato `{ "erro": "mensagem" }`.

## Regras de negócio

- Aluno exige nome e e-mail (400).
- Plano exige nome, valor mensal e duração em meses (400); o valor deve ser positivo e a duração deve ser um número inteiro positivo (422).
- Matrícula exige `alunoId` e `planoId` (400), e os dois precisam existir (404).
- Um aluno não pode ter duas matrículas ativas (409).
- Aluno com matrículas não pode ser removido (409).
- Plano com matrículas não pode ser removido (409).

## Estrutura do projeto

Separei o código em camadas para facilitar a organização e a manutenção do sistema. As regras de negócio ficam nos services e as consultas ao banco ficam nos models.

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
    config.js      endereço da API
    api.js         comunicação com a API (fetch)
    services/      regras da tela
    state/         estado da aplicação
    ui/            desenho da tela
MODELAGEM.md       modelagem de classes (S2)
s1/ … s4/          exercícios das semanas
```

## Autor

Pedro Henrique Almeida Guimarães · UEPB
