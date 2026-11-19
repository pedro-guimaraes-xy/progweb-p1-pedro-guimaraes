const botao = document.querySelector("#tema");

function aplicar(tema) {
  document.documentElement.setAttribute("data-bs-theme", tema);
  botao.textContent = tema === "dark" ? "☀️ Claro" : "🌙 Escuro";
}

let atual = matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
try {
  atual = localStorage.getItem("tema") ?? atual;
} catch {}
aplicar(atual);

botao.addEventListener("click", () => {
  atual = atual === "dark" ? "light" : "dark";
  aplicar(atual);
  try {
    localStorage.setItem("tema", atual);
  } catch {
    /* ignora */
  }
});
