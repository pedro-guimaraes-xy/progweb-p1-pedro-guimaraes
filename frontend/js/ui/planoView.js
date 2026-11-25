const el = {
  form: document.querySelector("#form-plano"),
  salvar: document.querySelector("#plano-salvar"),
  cancelar: document.querySelector("#plano-cancelar"),
  titulo: document.querySelector("#plano-titulo"),
  carregando: document.querySelector("#planos-carregando"),
  erro: document.querySelector("#planos-erro"),
  erroMsg: document.querySelector("#planos-erro-msg"),
  recarregar: document.querySelector("#planos-recarregar"),
  vazio: document.querySelector("#planos-vazio"),
  sucesso: document.querySelector("#planos-sucesso"),
  linhas: document.querySelector("#planos-linhas"),
};

const reais = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

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

function linha(plano, editandoId) {
  const tr = document.createElement("tr");
  if (plano.id === editandoId) tr.className = "editando";
  const acoes = celula("", "text-end text-nowrap");
  acoes.append(
    botao("Editar", "editar", plano.id, "btn-outline-primary me-1"),
    botao("Remover", "remover", plano.id, "btn-outline-danger"),
  );
  tr.append(
    celula(plano.id),
    celula(plano.nome),
    celula(reais.format(plano.valorMensal), "numero text-end text-nowrap"),
    celula(`${plano.duracaoMeses} meses`, "numero text-end text-nowrap"),
    acoes,
  );
  return tr;
}

export const planoView = {
  render({ status, planos, erro, editandoId, salvando }) {
    el.carregando.classList.toggle("d-none", status !== "carregando");
    el.erro.classList.toggle("d-none", status !== "erro");
    el.vazio.classList.toggle("d-none", status !== "vazio");
    el.sucesso.classList.toggle("d-none", status !== "sucesso");

    el.erroMsg.textContent = erro ?? "";
    el.linhas.replaceChildren(...planos.map((p) => linha(p, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando ? "Salvando…" : editandoId ? "Salvar alterações" : "Cadastrar plano";
    el.cancelar.classList.toggle("d-none", !editandoId);
    el.titulo.textContent = editandoId ? "Editar plano" : "Novo plano";
  },

  preencherForm(plano) {
    el.form.elements.nome.value = plano.nome;
    el.form.elements.valorMensal.value = plano.valorMensal;
    el.form.elements.duracaoMeses.value = plano.duracaoMeses;
    el.form.elements.nome.focus();
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

  aoRecarregar(fn) {
    el.recarregar.addEventListener("click", fn);
  },
  aoCancelar(fn) {
    el.cancelar.addEventListener("click", fn);
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
