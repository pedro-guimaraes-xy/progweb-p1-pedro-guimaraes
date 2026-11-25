import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

import alunoRoutes from "./routes/alunoRoutes.js";
import planoRoutes from "./routes/planoRoutes.js";
import matriculaRoutes from "./routes/matriculaRoutes.js";

const app = express();

const origens = (
  process.env.CORS_ORIGIN ?? "http://localhost:5500,http://127.0.0.1:5500"
).split(",");
app.use(cors({ origin: origens }));

app.use(express.json());
app.use(logger);

app.use("/alunos", alunoRoutes);
app.use("/planos", planoRoutes);
app.use("/matriculas", matriculaRoutes);

app.use(errorHandler);

export default app;
