import { Conta } from "./Conta.js";
import { ContaCorrente } from "./ContaCorrente.js";
import { ContaPoupanca } from "./ContaPoupanca.js";

const contas = [
  new ContaCorrente("0001", "Ana Lima", 500),
  new ContaPoupanca("0002", "Bruno Souza"),
];

contas.forEach((c) => c.depositar(1000));

function fecharMes(listaDeContas) {
  for (const conta of listaDeContas) {
    const tarifa = conta.tarifaMensal();
    if (tarifa > 0) conta.sacar(tarifa);
    console.log(`${conta} (tarifa: R$ ${tarifa.toFixed(2)})`);
  }
}

fecharMes(contas);

try {
  new Conta("0003", "Carla Dias");
} catch (e) {
  console.log("Erro esperado →", e.message);
}

console.log(contas[0].extrato);
