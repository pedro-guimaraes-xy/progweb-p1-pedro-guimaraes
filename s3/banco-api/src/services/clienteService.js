import { clienteModel } from '../models/clienteModel.js';
import { erro } from '../utils/erro.js';

export const clienteService = {
  listar() {
    return clienteModel.listar();
  },

  buscarPorId(id) {
    const cliente = clienteModel.buscarPorId(id);
    if (!cliente) throw erro(404, 'Cliente não encontrado');
    return cliente;
  },

  criar({ nome, cpf, email } = {}) {
    // Regra 1: nome e cpf são obrigatórios
    if (!nome || !cpf) throw erro(400, 'Campos "nome" e "cpf" são obrigatórios');
    // Regra 2: cpf é único
    if (clienteModel.existeCpf(cpf)) throw erro(409, 'Já existe um cliente com este CPF');
    return clienteModel.inserir({ nome, cpf, email });
  },

  atualizar(id, dados = {}) {
    const atualizado = clienteModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, 'Cliente não encontrado');
    return atualizado;
  },

  remover(id) {
    const removido = clienteModel.remover(id);
    if (!removido) throw erro(404, 'Cliente não encontrado');
  },
};
