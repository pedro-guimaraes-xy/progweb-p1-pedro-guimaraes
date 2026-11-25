# Telas do Projeto 1 (S4)

Front: `npx http-server -p 5500 -c-1` em `frontend/` · API: `npm run dev` em `backend/`

| Lista      | Estado              | Como provocar                       | O que aparece                                      |
| ---------- | ------------------- | ----------------------------------- | -------------------------------------------------- |
| Alunos     | carregando          | Network → throttling 3G → F5        | spinner "Carregando alunos…"                       |
| Alunos     | vazio               | API recém-iniciada                  | "Nenhum aluno ainda…"                              |
| Alunos     | erro                | Ctrl+C na API → F5                  | "Não consegui falar com a API…" + Tentar de novo   |
| Alunos     | sucesso             | cadastrar "Pedro"                   | tabela com 1 linha                                 |
| Planos     | vazio               | API recém-iniciada                  | "Nenhum plano ainda…"                              |
| Planos     | erro de regra (422) | valor mensal -1                     | aviso "Valor e duração devem ser maiores que zero" |
| Matrículas | vazio               | sem matrículas                      | "Nenhuma matrícula ainda…"                         |
| Matrículas | erro de regra (409) | matricular o mesmo aluno duas vezes | aviso "Este aluno já possui uma matrícula ativa"   |

## Camadas

- api: `js/api.js` · services: `js/services/` · state: `js/state/store.js` · ui: `js/ui/`
