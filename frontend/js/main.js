import "./ui/tema.js";
import { resumo } from "./ui/resumo.js";
import { criarStore } from "./state/store.js";
import { alunoService } from "./services/alunoService.js";
import { planoService } from "./services/planoService.js";
import { matriculaService } from "./services/matriculaService.js";
import { alunoView } from "./ui/alunoView.js";
import { planoView } from "./ui/planoView.js";
import { matriculaView } from "./ui/matriculaView.js";
import { aviso } from "./ui/aviso.js";
import "./ui/navegacao.js";

// ===================== ALUNOS =====================
const alunos = criarStore({
  status: "carregando",
  alunos: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

alunos.assinar(alunoView.render);

async function carregarAlunos() {
  alunos.set({ status: "carregando", erro: null });
  try {
    const lista = await alunoService.listar();
    alunos.set({ status: lista.length ? "sucesso" : "vazio", alunos: lista });
  } catch (e) {
    alunos.set({ status: "erro", erro: e.message });
  }
}

async function salvarAluno(dados) {
  const { editandoId } = alunos.get();
  aviso.limpar();
  alunos.set({ salvando: true });
  try {
    if (editandoId) await alunoService.atualizar(editandoId, dados);
    else await alunoService.criar(dados);

    aviso.sucesso(editandoId ? "Aluno atualizado." : "Aluno cadastrado.");
    alunoView.limparForm();
    alunos.set({ editandoId: null });
    await carregarAlunos();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    alunos.set({ salvando: false });
  }
}

function editarAluno(id) {
  const aluno = alunos.get().alunos.find((a) => a.id === id);
  alunoView.preencherForm(aluno);
  alunos.set({ editandoId: id });
}

function cancelarEdicaoAluno() {
  alunoView.limparForm();
  alunos.set({ editandoId: null });
}

async function removerAluno(id) {
  if (!confirm(`Remover o aluno #${id}?`)) return;
  aviso.limpar();
  try {
    await alunoService.remover(id);
    aviso.sucesso("Aluno removido.");
    if (alunos.get().editandoId === id) cancelarEdicaoAluno();
    await carregarAlunos();
  } catch (e) {
    aviso.erro(e.message);
  }
}

alunoView.aoEnviar(salvarAluno);
alunoView.aoCancelar(cancelarEdicaoAluno);
alunoView.aoRecarregar(carregarAlunos);
alunoView.aoClicarNaLista({ editar: editarAluno, remover: removerAluno });

// ===================== PLANOS =====================
const planos = criarStore({
  status: "carregando",
  planos: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

planos.assinar(planoView.render);

async function carregarPlanos() {
  planos.set({ status: "carregando", erro: null });
  try {
    const lista = await planoService.listar();
    planos.set({ status: lista.length ? "sucesso" : "vazio", planos: lista });
  } catch (e) {
    planos.set({ status: "erro", erro: e.message });
  }
}

async function salvarPlano(dados) {
  const { editandoId } = planos.get();
  aviso.limpar();
  planos.set({ salvando: true });
  try {
    if (editandoId) await planoService.atualizar(editandoId, dados);
    else await planoService.criar(dados);

    aviso.sucesso(editandoId ? "Plano atualizado." : "Plano cadastrado.");
    planoView.limparForm();
    planos.set({ editandoId: null });
    await carregarPlanos();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    planos.set({ salvando: false });
  }
}

function editarPlano(id) {
  const plano = planos.get().planos.find((a) => a.id === id);
  planoView.preencherForm(plano);
  planos.set({ editandoId: id });
}

function cancelarEdicaoPlano() {
  planoView.limparForm();
  planos.set({ editandoId: null });
}

async function removerPlano(id) {
  if (!confirm(`Remover o plano #${id}?`)) return;
  aviso.limpar();
  try {
    await planoService.remover(id);
    aviso.sucesso("Plano removido.");
    if (planos.get().editandoId === id) cancelarEdicaoPlano();
    await carregarPlanos();
  } catch (e) {
    aviso.erro(e.message);
  }
}

planoView.aoEnviar(salvarPlano);
planoView.aoCancelar(cancelarEdicaoPlano);
planoView.aoRecarregar(carregarPlanos);
planoView.aoClicarNaLista({ editar: editarPlano, remover: removerPlano });

// ===================== MATRÍCULAS =====================
const matriculas = criarStore({
  status: "carregando",
  matriculas: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

matriculas.assinar(matriculaView.render);

// As matrículas dependem de alunos e planos: quando mudam,
// refaz os <select> e redesenha os nomes na tabela.
alunos.assinar((estado) => {
  matriculaView.preencherAlunos(estado.alunos);
  matriculaView.render(matriculas.get());
});
planos.assinar((estado) => {
  matriculaView.preencherPlanos(estado.planos);
  matriculaView.render(matriculas.get());
});

async function carregarMatriculas() {
  matriculas.set({ status: "carregando", erro: null });
  try {
    const lista = await matriculaService.listar();
    matriculas.set({
      status: lista.length ? "sucesso" : "vazio",
      matriculas: lista,
    });
  } catch (e) {
    matriculas.set({ status: "erro", erro: e.message });
  }
}

async function salvarMatricula(dados) {
  const { editandoId } = matriculas.get();
  aviso.limpar();
  matriculas.set({ salvando: true });
  try {
    if (editandoId) await matriculaService.atualizar(editandoId, dados);
    else await matriculaService.criar(dados);

    aviso.sucesso(editandoId ? "Matrícula atualizada." : "Matrícula criada.");
    matriculaView.limparForm();
    matriculas.set({ editandoId: null });
    await carregarMatriculas();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    matriculas.set({ salvando: false });
  }
}

function editarMatricula(id) {
  const m = matriculas.get().matriculas.find((x) => x.id === id);
  matriculaView.preencherForm(m);
  matriculas.set({ editandoId: id });
}

function cancelarEdicaoMatricula() {
  matriculaView.limparForm();
  matriculas.set({ editandoId: null });
}

async function removerMatricula(id) {
  if (!confirm(`Remover a matrícula #${id}?`)) return;
  aviso.limpar();
  try {
    await matriculaService.remover(id);
    aviso.sucesso("Matrícula removida.");
    if (matriculas.get().editandoId === id) cancelarEdicaoMatricula();
    await carregarMatriculas();
  } catch (e) {
    aviso.erro(e.message);
  }
}

matriculaView.aoEnviar(salvarMatricula);
matriculaView.aoCancelar(cancelarEdicaoMatricula);
matriculaView.aoRecarregar(carregarMatriculas);
matriculaView.aoClicarNaLista({
  editar: editarMatricula,
  remover: removerMatricula,
});

// ===================== RESUMO =====================
function atualizarResumo() {
  resumo.render({
    alunos: alunos.get().alunos.length,
    planos: planos.get().planos.length,
    ativas: matriculas.get().matriculas.filter((m) => m.status === "ativa")
      .length,
  });
}
alunos.assinar(atualizarResumo);
planos.assinar(atualizarResumo);
matriculas.assinar(atualizarResumo);

// ===================== INICIO =====================
carregarAlunos();
carregarPlanos();
carregarMatriculas();
