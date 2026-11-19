// Camada de UI das contas. Mesmo molde da clienteView, com um <select> a mais.
const el = {
  form: document.querySelector('#form-conta'),
  cliente: document.querySelector('#conta-cliente'),
  salvar: document.querySelector('#conta-salvar'),
  cancelar: document.querySelector('#conta-cancelar'),
  carregando: document.querySelector('#contas-carregando'),
  erro: document.querySelector('#contas-erro'),
  erroMsg: document.querySelector('#contas-erro-msg'),
  recarregar: document.querySelector('#contas-recarregar'),
  vazio: document.querySelector('#contas-vazio'),
  sucesso: document.querySelector('#contas-sucesso'),
  linhas: document.querySelector('#contas-linhas'),
};

const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const NOME_TIPO = { corrente: 'Corrente', poupanca: 'Poupança' };

// id → nome, para mostrar o dono da conta sem outra requisição
let nomeDoCliente = new Map();

function celula(texto, classe = '') {
  const td = document.createElement('td');
  td.textContent = texto;
  td.className = classe;
  return td;
}

function botao(texto, acao, id, classe) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  b.className = `btn btn-sm ${classe}`;
  b.dataset.acao = acao;
  b.dataset.id = id;
  return b;
}

function linha(conta, editandoId) {
  const tr = document.createElement('tr');
  if (conta.id === editandoId) tr.className = 'editando';

  const dono = nomeDoCliente.get(conta.clienteId)
    ?? `cliente #${conta.clienteId} (removido)`; // conta órfã: assunto da S5

  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(
    botao('Editar', 'editar', conta.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', conta.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(conta.id),
    celula(dono),
    celula(NOME_TIPO[conta.tipo] ?? conta.tipo),
    celula(reais.format(conta.saldo), 'numero text-end text-nowrap'),
    acoes,
  );
  return tr;
}

export const contaView = {
  // Preenche o <select> com os clientes que existem agora
  preencherClientes(clientes) {
    nomeDoCliente = new Map(clientes.map((c) => [c.id, c.nome]));
    const escolhido = el.cliente.value;

    const opcoes = clientes.map((c) => new Option(`${c.nome} (#${c.id})`, c.id));
    el.cliente.replaceChildren(new Option('Selecione…', ''), ...opcoes);

    // mantém a escolha, se o cliente ainda existir
    if (nomeDoCliente.has(Number(escolhido))) el.cliente.value = escolhido;
  },

  render({ status, contas, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...contas.map((c) => linha(c, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId ? 'Salvar alterações' : 'Abrir conta';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(conta) {
    el.form.clienteId.value = conta.clienteId;
    el.form.tipo.value = conta.tipo;
    el.form.saldo.value = conta.saldo;
    el.form.saldo.focus();
  },

  limparForm() {
    el.form.reset();
  },

  aoEnviar(fn) {
    el.form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      fn(Object.fromEntries(new FormData(el.form)));
    });
  },

  aoCancelar(fn) {
    el.cancelar.addEventListener('click', fn);
  },

  aoRecarregar(fn) {
    el.recarregar.addEventListener('click', fn);
  },

  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('button[data-acao]');
      if (!alvo) return;
      const id = Number(alvo.dataset.id);
      if (alvo.dataset.acao === 'editar') editar(id);
      if (alvo.dataset.acao === 'remover') remover(id);
    });
  },
};
