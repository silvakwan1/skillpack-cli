---
name: express-backend
description: |
  Skill de backend para Express. Contém padrões de criação de rotas, estruturação de controladores,
  gerenciamento de middlewares, tratamento centralizado de erros e segurança HTTP.
---

# Skill Express Backend — Melhores Práticas

## 🌐 Roteamento e Controladores
- **Rotas Limpas**: As rotas devem apenas mapear verbos HTTP e caminhos para os respectivos métodos de controladores.
- **Async/Await Wrapper**: Use wrappers ou pacotes como `express-async-errors` para lidar com exceções em middlewares assíncronos de forma limpa, evitando a necessidade de usar blocos `try/catch` repetitivos em cada controller.

```typescript
// users.controller.ts
import { Request, Response } from 'express';
import { usersService } from '../services/users.service';

export const createUser = async (req: Request, res: Response) => {
  const user = await usersService.create(req.body);
  res.status(201).json(user);
};
```

---

## 🔒 Middlewares e Segurança
1. **Helmet**: Sempre habilite o `helmet` no topo da aplicação para adicionar cabeçalhos de segurança essenciais.
2. **CORS**: Configure a política de CORS especificando as origens permitidas.
3. **Autenticação**: Crie middlewares reutilizáveis para validar tokens (JWT, por exemplo) e injetar as informações do usuário logado na requisição (`req.user`).

```typescript
// middlewares/auth.ts
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
```

---

## ⚙️ Tratamento de Erros e Validação
- **Validação com Zod**: Crie schemas Zod e execute-os em um middleware de validação antes de acessar o controller.
- **Erros Customizados**: Herde da classe `Error` padrão do JS para criar classes de erros HTTP específicas (ex: `NotFoundError`, `BadRequestError`, `UnauthorizedError`) facilitando a manipulação e a definição do status HTTP no middleware global de tratamento de erros.

---

## 📋 Validação com Zod

### Middleware de Validação Reutilizável:

```typescript
// middlewares/validate.ts
import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    next(error);
  }
};
```

### Schemas de Validação:

```typescript
// schemas/user.schema.ts
import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    role: z.enum(["admin", "editor", "viewer"]).default("viewer"),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID inválido"),
  }),
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().email().optional(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
```

### Uso nas Rotas:

```typescript
// routes/users.routes.ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { createUser, updateUser } from "../controllers/users.controller";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.put("/:id", validate(updateUserSchema), updateUser);

export default router;
```

---

## 🗄️ Banco de Dados com Prisma

### Configuração do Prisma Client

```typescript
// config/database.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

### Padrão de Service com Prisma:

```typescript
// services/users.service.ts
import { db } from "../config/database";
import { CreateUserInput } from "../schemas/user.schema";
import bcrypt from "bcrypt";

export const usersService = {
  async create(data: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    return db.user.create({
      data: { ...data, password: hashedPassword },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  },

  async findAll(page = 1, limit = 20) {
    const [users, total] = await db.$transaction([
      db.user.findMany({
        select: { id: true, name: true, email: true, role: true },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
      db.user.count(),
    ]);
    return { users, total, pages: Math.ceil(total / limit) };
  },

  async findById(id: string) {
    return db.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  },

  async update(id: string, data: Partial<CreateUserInput>) {
    return db.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true },
    });
  },

  async delete(id: string) {
    return db.user.delete({ where: { id } });
  },
};
```

### Regras de Prisma:
- [ ] **Singleton**: Sempre usar o padrão singleton para o `PrismaClient`.
- [ ] **Select**: Usar `select` para trazer apenas os campos necessários.
- [ ] **Paginação**: Sempre paginar listagens com `take` e `skip`.
- [ ] **Transactions**: Usar `db.$transaction()` para operações em múltiplas tabelas.
- [ ] **Migrations**: Rodar `npx prisma migrate dev` para criar migrações.
- [ ] **Seed**: Manter `prisma/seed.ts` para dados iniciais.
- [ ] **Nunca expor senha**: Sempre usar `select` para excluir campo `password`.

