export class ErroApp extends Error {
  constructor(mensagem, statusCode = 400) {
    super(mensagem);
    this.statusCode = statusCode;
  }
}
