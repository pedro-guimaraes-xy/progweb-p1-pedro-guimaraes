const caixa = document.querySelector("#aviso");

let temporizador;
let temporizadorFade;

caixa.style.transition = "opacity 1s ease-in-out";

function mostrar(tipo, texto) {
  clearTimeout(temporizador);
  clearTimeout(temporizadorFade);

  caixa.className = `alert alert-${tipo}`;
  caixa.textContent = texto;
  caixa.style.opacity = "1";

  temporizador = setTimeout(() => {
    caixa.style.opacity = "0";

    temporizadorFade = setTimeout(() => {
      aviso.limpar();
    }, 500);
  }, 1000);
}

export const aviso = {
  sucesso: (texto) => mostrar("success", texto),
  erro: (texto) => mostrar("danger", texto),

  limpar() {
    clearTimeout(temporizador);
    clearTimeout(temporizadorFade);

    caixa.className = "alert d-none";
    caixa.textContent = "";
  },
};
