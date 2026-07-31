---
name: backend
description: |
  Skill de backend universal. Contém melhores práticas para arquitetura em camadas,
  design de APIs REST/GraphQL, persistência de dados (Prisma/SQL), autenticação, autorização e validações.
---

# Skill Backend Universal — Melhores Práticas

## 🌐 APIs RESTful e Protocolos
- **Status Semânticos**: Use os códigos HTTP corretos (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Error`).
- **Nomes de Recursos**: Use substantivos no plural para rotas (ex: `/api/v1/users` em vez de `/api/v1/getUser`).
- **Validação**: Valide dados de entrada (body, params, query) usando schemas de validação (ex: Zod, Joi).

---

## 🔒 Segurança de Backend
1. **Sanitização**: Evite SQL injection utilizando queries parametrizadas ou ORMs robustos (Prisma, TypeORM, Drizzle).
2. **Criptografia**: Salve senhas usando algoritmos de hash seguros como `bcrypt`, `argon2` ou `scrypt` (nunca MD5 ou SHA-1).
3. **CORS e Headers**: Configure políticas CORS restritivas e utilize cabeçalhos de segurança adequados (como Helmet para Node.js).
4. **Rate Limiting**: Habilite limites de requisição por IP em endpoints sensíveis.

---

## ⚙️ Conexão com Banco de Dados & Transações
- **Connection Pools**: Configure pools de conexão para bancos de dados relacionais a fim de otimizar a reutilização de conexões e evitar sobrecarga do servidor.
- **Transactions**: Use transações explícitas quando realizar inserções ou atualizações em múltiplas tabelas que dependem uma da outra.

---

## 📋 Validação com Zod

```typescript
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  role: z.enum(["admin", "editor", "viewer"]).default("viewer"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```
