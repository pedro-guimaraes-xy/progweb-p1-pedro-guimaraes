// Camada de UI: navegação entre apresentação, páginas do sistema e sidebar.
const inicio = document.querySelector("#inicio");
const app = document.querySelector("#app");
const titulo = document.querySelector("#titulo-pagina");
const paginas = document.querySelectorAll(".pagina");
const itens = document.querySelectorAll(".nav-item[data-pagina]");
const sidebar = document.querySelector("#sidebar");

const TITULOS = {
  dashboard: "Dashboard",
  alunos: "Alunos",
  planos: "Planos",
  matriculas: "Matrículas",
};

function fecharMenu() {
  sidebar.classList.remove("aberta");
  document.querySelector("#overlay").classList.remove("visivel");
}

function mostrarPagina(nome) {
  if (!TITULOS[nome]) nome = "dashboard";
  paginas.forEach((p) =>
    p.classList.toggle("d-none", p.id !== `pagina-${nome}`),
  );
  itens.forEach((i) => i.classList.toggle("ativo", i.dataset.pagina === nome));
  titulo.textContent = TITULOS[nome];
  document.title = `${TITULOS[nome]} · Academia`;
  history.replaceState(null, "", `#${nome}`);
  fecharMenu();
  window.scrollTo({ top: 0 });
}

function mostrarApp(pagina = "dashboard") {
  inicio.classList.add("d-none");
  app.classList.remove("d-none");
  mostrarPagina(pagina);
}

function mostrarInicio() {
  app.classList.add("d-none");
  inicio.classList.remove("d-none");
  history.replaceState(null, "", location.pathname);
  window.scrollTo({ top: 0 });
}

// Delegação: um listener para todos os botões de navegação.
document.addEventListener("click", (evento) => {
  const ir = evento.target.closest("[data-ir]");
  if (ir) {
    if (ir.dataset.ir === "app") mostrarApp(ir.dataset.pagina);
    else mostrarInicio();
    return;
  }
  const item = evento.target.closest(".nav-item[data-pagina]");
  if (item) mostrarPagina(item.dataset.pagina);
});

// Sidebar: recolher (desktop) e abrir/fechar (celular)
document.querySelector("#recolher").addEventListener("click", () => {
  app.classList.toggle("colapsada");
});
document.querySelector("#abrir-menu").addEventListener("click", () => {
  sidebar.classList.add("aberta");
  document.querySelector("#overlay").classList.add("visivel");
});
document.querySelector("#overlay").addEventListener("click", fecharMenu);

// Link direto (ex.: /#planos) pula a apresentação.
const alvo = location.hash.slice(1);
if (TITULOS[alvo]) mostrarApp(alvo);
