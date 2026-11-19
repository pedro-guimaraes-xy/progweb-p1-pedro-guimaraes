const el = {
  form: document.querySelector("#form-aluno"),
  salvar: document.querySelector("#aluno-salvar"),
  cancelar: document.querySelector("#aluno-cancelar"),
  carregando: document.querySelector("#alunos-carregando"),
  erro: document.querySelector("#alunos-erro"),
  erroMsg: document.querySelector("#alunos-erro-msg"),
  recarregar: document.querySelector("#alunos-recarregar"),
  vazio: document.querySelector("#alunos-vazio"),
  sucesso: document.querySelector("#alunos-sucesso"),
  linhas: document.querySelector("#alunos-linhas"),
};

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

function linha(aluno, editandoId) {
  const tr = document.createElement("tr");
  if (aluno.id === editandoId) tr.className = "editando";

  const acoes = celula("", "text-end text-nowrap");
  acoes.append(
    botao("Editar", "editar", aluno.id, "btn-outline-primary me-1"),
    botao("Remover", "remover", aluno.id, "btn-outline-danger"),
  );

  tr.append(celula(aluno.id), celula(aluno.nome), celula(aluno.email), acoes);
  return tr;
}

export const alunoView = {
  render({ status, alunos, erro, editandoId, salvando }) {
    el.carregando.classList.toggle("d-none", status !== "carregando");
    el.erro.classList.toggle("d-none", status !== "erro");
    el.vazio.classList.toggle("d-none", status !== "vazio");
    el.sucesso.classList.toggle("d-none", status !== "sucesso");

    el.erroMsg.textContent = erro ?? "";
    el.linhas.replaceChildren(...alunos.map((a) => linha(a, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? "Salvando…"
      : editandoId
        ? "Salvar alterações"
        : "Cadastrar aluno";
    el.cancelar.classList.toggle("d-none", !editandoId);
  },

  preencherForm(aluno) {
    el.form.nome.value = aluno.nome;
    el.form.email.value = aluno.email;
    el.form.nome.focus();
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
