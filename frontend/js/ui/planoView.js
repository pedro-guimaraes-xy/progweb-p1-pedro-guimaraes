const el = {
  form: document.querySelector("#form-plano"),
  salvar: document.querySelector("#plano-salvar"),
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

function linha(plano) {
  const tr = document.createElement("tr");
  tr.append(
    celula(plano.id),
    celula(plano.nome),
    celula(reais.format(plano.valorMensal), "numero text-end text-nowrap"),
    celula(`${plano.duracaoMeses} meses`, "numero text-end text-nowrap"),
  );
  return tr;
}

export const planoView = {
  render({ status, planos, erro, salvando }) {
    el.carregando.classList.toggle("d-none", status !== "carregando");
    el.erro.classList.toggle("d-none", status !== "erro");
    el.vazio.classList.toggle("d-none", status !== "vazio");
    el.sucesso.classList.toggle("d-none", status !== "sucesso");

    el.erroMsg.textContent = erro ?? "";
    el.linhas.replaceChildren(...planos.map(linha));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando ? "Salvando…" : "Cadastrar plano";
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
};
