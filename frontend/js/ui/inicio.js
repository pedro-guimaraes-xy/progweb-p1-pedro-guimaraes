const inicio = document.querySelector("#inicio");
const painel = document.querySelector("#painel");

function mostrar(destino, secao) {
  const noPainel = destino === "painel";
  inicio.classList.toggle("d-none", noPainel);
  painel.classList.toggle("d-none", !noPainel);

  if (noPainel && secao) {
    document.getElementById(secao)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0 });
  }
}

document.addEventListener("click", (evento) => {
  const alvo = evento.target.closest("[data-ir]");
  if (!alvo) return;
  mostrar(alvo.dataset.ir, alvo.dataset.secao);
});

if (location.hash.startsWith("#secao-")) {
  mostrar("painel", location.hash.slice(1));
}
