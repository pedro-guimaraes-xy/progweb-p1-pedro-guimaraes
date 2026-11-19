// Camada de UI: a única que toca no DOM dos clientes.
// Não faz fetch e não valida regra: desenha o estado e avisa dos eventos.
const el = {
  form: document.querySelector('#form-cliente'),
  salvar: document.querySelector('#cli-salvar'),
  cancelar: document.querySelector('#cli-cancelar'),
  carregando: document.querySelector('#clientes-carregando'),
  erro: document.querySelector('#clientes-erro'),
  erroMsg: document.querySelector('#clientes-erro-msg'),
  recarregar: document.querySelector('#clientes-recarregar'),
  vazio: document.querySelector('#clientes-vazio'),
  sucesso: document.querySelector('#clientes-sucesso'),
  linhas: document.querySelector('#clientes-linhas'),
};

function formatarCpf(cpf) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

function celula(texto, classe = '') {
  const td = document.createElement('td');
  td.textContent = texto; // dado do usuário entra como TEXTO, nunca como HTML
  td.className = classe;
  return td;
}

function botao(texto, acao, id, classe) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  b.className = `btn btn-sm ${classe}`;
  b.dataset.acao = acao; // vira data-acao="editar" no HTML
  b.dataset.id = id;
  return b;
}

function linha(cliente, editandoId) {
  const tr = document.createElement('tr');
  if (cliente.id === editandoId) tr.className = 'editando';

  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(
    botao('Editar', 'editar', cliente.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', cliente.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(cliente.id),
    celula(cliente.nome),
    celula(formatarCpf(cliente.cpf), 'numero text-nowrap'),
    celula(cliente.email ?? '—'),
    acoes,
  );
  return tr;
}

export const clienteView = {
  // Desenha a tela a partir do estado: a UI é função do estado.
  render({ status, clientes, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...clientes.map((c) => linha(c, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId ? 'Salvar alterações' : 'Cadastrar cliente';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(cliente) {
    el.form.nome.value = cliente.nome;
    el.form.cpf.value = formatarCpf(cliente.cpf);
    el.form.email.value = cliente.email ?? '';
    el.form.nome.focus();
  },

  limparForm() {
    el.form.reset();
  },

  // --- Eventos: a view avisa; quem decide o que fazer é o main.js ---
  aoEnviar(fn) {
    el.form.addEventListener('submit', (evento) => {
      evento.preventDefault(); // sem isto, o navegador recarrega a página
      fn(Object.fromEntries(new FormData(el.form)));
    });
  },

  aoCancelar(fn) {
    el.cancelar.addEventListener('click', fn);
  },

  aoRecarregar(fn) {
    el.recarregar.addEventListener('click', fn);
  },

  // Delegação: UM listener no <tbody> atende os botões de todas as linhas.
  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('button[data-acao]');
      if (!alvo) return;
      const id = Number(alvo.dataset.id); // tudo que vem do DOM é string
      if (alvo.dataset.acao === 'editar') editar(id);
      if (alvo.dataset.acao === 'remover') remover(id);
    });
  },
};
