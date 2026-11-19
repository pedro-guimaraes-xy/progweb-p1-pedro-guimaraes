// Quatro argumentos: é assim que o Express reconhece um tratador de erro.
export function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  console.error(`❌ ${req.method} ${req.url} → ${status}: ${err.message}`);
  res.status(status).json({ erro: err.message ?? 'Erro interno do servidor' });
}
