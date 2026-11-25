// Fábrica de erros com status. O service usa; o errorHandler lê.
export function erro(status, message) {
  const e = new Error(message);
  e.status = status;
  return e;
}
