// O estado da tela em um lugar só.
// Quem muda o estado (set) avisa quem desenha (os assinantes).
export function criarStore(inicial) {
  let estado = { ...inicial };
  const assinantes = [];

  return {
    get() {
      return estado;
    },

    set(parcial) {
      estado = { ...estado, ...parcial };
      assinantes.forEach((fn) => fn(estado));
    },

    assinar(fn) {
      assinantes.push(fn);
      fn(estado); // desenha o estado inicial
    },
  };
}
