export class Conta {
  #saldo = 0;
  #titular;

  constructor(numero, titular) {
    this.numero = numero;
    this.titular = titular;
  }

  get saldo() {
    return this.#saldo;
  }

  get titular() {
    return this.#titular;
  }

  set titular(nome) {
    if (typeof nome !== "string" || nome.trim().length < 3) {
      throw new Error("Titular inválido");
    }
    this.#titular = nome.trim();
  }

  depositar(valor) {
    if (!(valor > 0)) throw new Error("Depósito deve ser positivo");
    this.#saldo += valor;
  }

  saldoDisponivel() {
    return this.#saldo;
  }

  sacar(valor) {
    if (!(valor > 0)) throw new Error("Saque deve ser positivo");
    if (valor > this.saldoDisponivel()) throw new Error("Saldo insuficiente");
    this.#saldo -= valor;
  }
}
