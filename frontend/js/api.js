import { API_URL } from './config.js';

// Camada HTTP: a única que conhece fetch, URL, headers e status.
async function request(metodo, caminho, dados) {
  const opcoes = { method: metodo, headers: {} };
  if (dados !== undefined) {
    opcoes.headers['Content-Type'] = 'application/json';
    opcoes.body = JSON.stringify(dados); // objeto JS → texto JSON
  }

  let resp;
  try {
    resp = await fetch(`${API_URL}${caminho}`, opcoes);
  } catch {
    // O fetch só rejeita quando NÃO houve resposta:
    // API fora do ar, bloqueio de CORS ou falta de rede.
    throw new Error('Não consegui falar com a API. Ela está rodando?');
  }

  if (resp.status === 204) return null; // sem corpo: nada de .json()

  const corpo = await resp.json().catch(() => null);

  // 4xx e 5xx NÃO rejeitam o fetch. Quem decide é o resp.ok.
  if (!resp.ok) throw new Error(corpo?.erro ?? `Erro ${resp.status}`);

  return corpo;
}

export const api = {
  get: (caminho) => request('GET', caminho),
  post: (caminho, dados) => request('POST', caminho, dados),
  put: (caminho, dados) => request('PUT', caminho, dados),
  delete: (caminho) => request('DELETE', caminho),
};
