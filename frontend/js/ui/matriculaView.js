const el = {
  form: document.querySelector("#form-matricula"),
  aluno: document.querySelector("#mat-aluno"),
  plano: document.querySelector("#mat-plano"),
  salvar: document.querySelector("#mat-salvar"),
  cancelar: document.querySelector("#mat-cancelar"),
  carregando: document.querySelector("#matriculas-carregando"),
  erro: document.querySelector("#matriculas-erro"),
  erroMsg: document.querySelector("#matriculas-erro-msg"),
  recarregar: document.querySelector("#matriculas-recarregar"),
  vazio: document.querySelector("#matriculas-vazio"),
  sucesso: document.querySelector("#matriculas-sucesso"),
  linhas: document.querySelector("#matriculas-linhas"),
};

let nomeDoAluno = new Map();
let nomeDoPlano = new Map();

function celula(texto, classe = "") {
  const td = document.createElement("td");
  td.textContent = texto;
  td.className = classe;
  return td;
}

function botao(texto, acao, id, classe) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = texto;
  b.className = `btn btn-sm ${classe}`;
  b.dataset.acao = acao;
  b.dataset.id = id;
  return b;
}

function preencherSelect(select, opcoes, escolhido) {
  select.replaceChildren(new Option("Selecione…", ""), ...opcoes);
  if (
    escolhido &&
    select.querySelector(`option[value="${CSS.escape(escolhido)}"]`)
  ) {
    select.value = escolhido;
  }
}

function celulaStatus(status) {
  const td = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = `badge rounded-pill text-bg-${status === "ativa" ? "success" : "secondary"}`;
  badge.textContent = status;
  td.append(badge);
  return td;
}

function linha(m, editandoId) {
  const tr = document.createElement("tr");
  if (m.id === editandoId) tr.className = "editando";

  const acoes = celula("", "text-end text-nowrap");
  acoes.append(
    botao("Editar", "editar", m.id, "btn-outline-primary me-1"),
    botao("Remover", "remover", m.id, "btn-outline-danger"),
  );

  tr.append(
    celula(m.id),
    celula(nomeDoAluno.get(m.alunoId) ?? `aluno #${m.alunoId} (removido)`),
    celula(nomeDoPlano.get(m.planoId) ?? `plano #${m.planoId}`),
    celula(m.dataInicio),
    celulaStatus(m.status),
    acoes,
  );
  return tr;
}

export const matriculaView = {
  preencherAlunos(alunos) {
    nomeDoAluno = new Map(alunos.map((a) => [a.id, a.nome]));
    const opcoes = alunos.map((a) => new Option(`${a.nome} (#${a.id})`, a.id));
    preencherSelect(el.aluno, opcoes, el.aluno.value);
  },

  preencherPlanos(planos) {
    nomeDoPlano = new Map(planos.map((p) => [p.id, p.nome]));
    const opcoes = planos.map((p) => new Option(`${p.nome} (#${p.id})`, p.id));
    preencherSelect(el.plano, opcoes, el.plano.value);
  },

  render({ status, matriculas, erro, editandoId, salvando }) {
    el.carregando.classList.toggle("d-none", status !== "carregando");
    el.erro.classList.toggle("d-none", status !== "erro");
    el.vazio.classList.toggle("d-none", status !== "vazio");
    el.sucesso.classList.toggle("d-none", status !== "sucesso");

    el.erroMsg.textContent = erro ?? "";
    el.linhas.replaceChildren(...matriculas.map((m) => linha(m, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? "Salvando…"
      : editandoId
        ? "Salvar alterações"
        : "Matricular";
    el.cancelar.classList.toggle("d-none", !editandoId);
  },

  preencherForm(m) {
    el.form.alunoId.value = m.alunoId;
    el.form.planoId.value = m.planoId;
    el.form.alunoId.focus();
  },

  limparForm() {
    el.form.reset();
  },

  aoEnviar(fn) {
    el.form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      fn(Object.fromEntries(new FormData(el.form)));
    });
  },

  aoCancelar(fn) {
    el.cancelar.addEventListener("click", fn);
  },

  aoRecarregar(fn) {
    el.recarregar.addEventListener("click", fn);
  },

  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener("click", (evento) => {
      const alvo = evento.target.closest("button[data-acao]");
      if (!alvo) return;
      const id = Number(alvo.dataset.id);
      if (alvo.dataset.acao === "editar") editar(id);
      if (alvo.dataset.acao === "remover") remover(id);
    });
  },
};
