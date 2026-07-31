---
name: express-backend
description: |
  Skill de backend para Express.js com TypeScript. Contém arquitetura em camadas (Controllers, Services, Repositories),
  validação de schemas com Zod, middleware de erros centralizado, Helmet e rate-limiting.
---

# Skill Express Backend — Melhores Práticas & TypeScript

## 🏛️ Estrutura em Camadas

```
src/
├── controllers/    # Recebe requisições HTTP, valida com Zod e responde
├── services/       # Contém toda a lógica de negócio da aplicação
├── repositories/   # Interface de acesso a dados (Prisma, TypeORM, SQL)
├── middlewares/    # Validações, autenticação, controle de taxa, erros
├── schemas/        # Schemas de validação Zod
└── routes/         # Definição das rotas e vincular middlewares
```

---

## 🔒 Middleware de Erros Centralizado & Async Wrappers

- **Express Async Error Handler**: Sempre capture exceções assíncronas para evitar unhandled promise rejections.
- **ErrorHandler Global**: Trate ZodErrors, erros de banco de dados e exceções customizadas em um único middleware.

```typescript
// middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Dados de entrada inválidos",
      errors: err.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
    });
  }

  console.error("[ERROR]", err);
  return res.status(500).json({ success: false, message: "Erro interno no servidor" });
};
```

---

## 📋 Validação com Zod Middleware

```typescript
// middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      return next(error);
    }
  };
```

---

## 🛡️ Segurança no Bootstrap (`app.ts`)

```typescript
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") || "*" }));
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/", limiter);

// Registre suas rotas aqui
// app.use("/api/v1/users", userRoutes);

app.use(errorHandler);

export default app;
```
