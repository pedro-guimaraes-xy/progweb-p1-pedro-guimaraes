import { api } from '../api.js';

const TIPOS = ['corrente', 'poupanca'];

function preparar({ tipo, saldo, clienteId }) {
  if (!clienteId) throw new Error('Selecione o cliente.');
  if (!TIPOS.includes(tipo)) throw new Error('Tipo de conta inválido.');
  if (saldo === '' || Number.isNaN(Number(saldo))) {
    throw new Error('Informe o saldo em números.');
  }
  // Formulário só entrega string: convertemos antes de enviar
  return { tipo, saldo: Number(saldo), clienteId: Number(clienteId) };
}

export const contaService = {
  listar() {
    return api.get('/contas');
  },

  async criar(dados) {
    return api.post('/contas', preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/contas/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/contas/${id}`);
  },
};
