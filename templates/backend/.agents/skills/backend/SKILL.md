---
name: generic-backend
description: |
  Skill de backend geral. Contém melhores práticas para arquitetura em camadas,
  segurança de APIs, acesso a bancos de dados relacionais/NoSQL e tratamento de erros.
---

# Skill Backend Geral — Melhores Práticas

## 🌐 APIs RESTful e Protocolos
- **Status Semânticos**: Use os códigos HTTP corretos (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Error`).
- **Nomes de Recursos**: Use substantivos no plural para rotas (ex: `/api/v1/users` em vez de `/api/v1/getUser`).
- **Validação**: Valide dados de entrada (body, params, query) usando bibliotecas de validação específicas de cada linguagem.

---

## 🔒 Segurança de Backend
1. **Sanitização**: Evite SQL injection utilizando queries parametrizadas ou ORMs robustos.
2. **Criptografia**: Salve senhas usando algoritmos de hash seguros como `bcrypt`, `argon2` ou `scrypt` (nunca MD5 ou SHA-1).
3. **CORS e Headers**: Configure políticas CORS restritivas e utilize cabeçalhos de segurança adequados (como Helmet para Node.js).
4. **Rate Limiting**: Habilite limites de requisição por IP em endpoints sensíveis.

---

## ⚙️ Conexão com Banco de Dados
- **Connection Pools**: Configure pools de conexão para bancos de dados relacionais a fim de otimizar a reutilização de conexões e evitar sobrecarga do servidor.
- **Transactions**: Use transações explícitas quando realizar inserções ou atualizações em múltiplas tabelas que dependem uma da outra para manter a consistência dos dados.

---

## 🗄️ Banco de Dados com Prisma

### Configuração do Prisma Client (Singleton):

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

### Padrões de CRUD com Prisma:

```typescript
// services/users.service.ts
import { db } from "../lib/db";
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
    return db.user.update({ where: { id }, data });
  },

  async delete(id: string) {
    return db.user.delete({ where: { id } });
  },
};
```

### Regras de Prisma:
- [ ] **Singleton**: Sempre usar o padrão singleton para o `PrismaClient`.
- [ ] **Select**: Usar `select` para trazer apenas os campos necessários (nunca `SELECT *`).
- [ ] **Paginação**: Sempre paginar listagens com `take` e `skip`.
- [ ] **Transactions**: Usar `db.$transaction()` para operações em múltiplas tabelas.
- [ ] **Migrations**: Rodar `npx prisma migrate dev` para criar migrações.
- [ ] **Seed**: Manter `prisma/seed.ts` para dados iniciais.
- [ ] **Nunca expor senha**: Sempre usar `select` para excluir o campo `password` das respostas.

---

## 📋 Validação com Zod

### Schemas de Validação:

```typescript
// schemas/user.schema.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  role: z.enum(["admin", "editor", "viewer"]).default("viewer"),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  email: z.string().email().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
```

### Validação no Controller/Handler:

```typescript
import { z } from "zod";
import { createUserSchema } from "../schemas/user.schema";

export const createUser = async (req, res) => {
  try {
    const parsed = createUserSchema.parse(req.body);
    const user = await usersService.create(parsed);
    return res.status(201).json({ success: true, data: user });
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
    return res.status(500).json({ success: false, error: "Erro interno" });
  }
};
```

### Regras de Zod:
- [ ] **Schemas separados**: Um arquivo de schema por entidade (user, post, etc.).
- [ ] **Types inferidos**: Usar `z.infer<typeof schema>` para gerar tipos automaticamente.
- [ ] **Mensagens em português**: Definir mensagens de erro customizadas nos schemas.
- [ ] **Validar no entry point**: Validar na camada de controller/handler, antes de chamar o service.
- [ ] **Schemas reutilizáveis**: Extrair validações comuns (email, CPF, telefone) para arquivo compartilhado.

