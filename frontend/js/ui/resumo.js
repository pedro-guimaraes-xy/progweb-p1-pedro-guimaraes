const caixa = document.querySelector("#resumo");

const ITENS = [
  {
    chave: "alunos",
    emoji: "🧑‍🤝‍🧑",
    rotulo: "Alunos cadastrados",
    classe: "resumo-alunos",
  },
  {
    chave: "planos",
    emoji: "🏷️",
    rotulo: "Planos disponíveis",
    classe: "resumo-planos",
  },
  {
    chave: "ativas",
    emoji: "✅",
    rotulo: "Matrículas ativas",
    classe: "resumo-ativas",
  },
];

function card({ emoji, rotulo, classe }, valor) {
  const col = document.createElement("div");
  col.className = "col-12 col-md-4";

  const corpo = document.createElement("div");
  corpo.className = `resumo-card d-flex align-items-center gap-3 ${classe}`;

  const icone = document.createElement("span");
  icone.className = "emoji";
  icone.textContent = emoji;

  const texto = document.createElement("div");
  const num = document.createElement("div");
  num.className = "valor";
  num.textContent = valor;
  const leg = document.createElement("div");
  leg.className = "rotulo";
  leg.textContent = rotulo;
  texto.append(num, leg);

  corpo.append(icone, texto);
  col.append(corpo);
  return col;
}

export const resumo = {
  render(totais) {
    caixa.replaceChildren(...ITENS.map((i) => card(i, totais[i.chave])));
  },
};
