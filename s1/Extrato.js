// Composição, não agregação: o Extrato é criado dentro da Conta (new Extrato())
// e só existe por causa dela. Se a Conta deixa de existir, o Extrato vai junto.
// listar() devolve cópia porque, se devolvesse o array original, quem chamasse
// conta.extrato poderia dar push ou apagar lançamentos por fora, quebrando o encapsulamento.

export class Extrato {
  #lancamentos = [];

  registrar(tipo, valor) {
    this.#lancamentos.push({ tipo, valor, data: new Date() });
  }

  listar() {
    return [...this.#lancamentos];
  }
}
