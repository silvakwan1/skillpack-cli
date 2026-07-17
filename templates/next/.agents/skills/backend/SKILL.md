---
name: next-backend
description: |
  Skill de backend para Next.js (App Router). Contém padrões de desenvolvimento para Route Handlers,
  Server Actions, manipulação de banco de dados, middleware, validação com Zod, tratamento de erros e segurança.
  Consulte esta skill antes de criar ou modificar APIs ou lógica server-side no Next.js.
---

# Skill Next.js Backend — Melhores Práticas

## 🌐 Route Handlers (API Routes)

Toda API route no Next.js App Router (`app/api/.../route.ts`) deve seguir regras rígidas de segurança, tipagem e performance.

### Padrão de Estrutura:
```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db"; // Abstração do banco
import { AppError } from "@/utils/errors"; // Classe de erro padrão

const requestSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["active", "inactive"]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = requestSchema.parse(body);

    const result = await db.updateItem(parsedData.id, parsedData.status);

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    if (error instanceof AppError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.statusCode });
    }
    console.error("[API_ROUTE_ERROR]:", error);
    return NextResponse.json({ success: false, error: "Erro interno no servidor" }, { status: 500 });
  }
}
```

---

## ⚡ Server Actions (`"use server"`)

Server Actions são funções assíncronas executadas no servidor. Elas devem ser seguras e validar a autorização em cada chamada.

### Regras Invioláveis:
1. **Validação de Entrada**: Sempre valide os dados recebidos com schemas do Zod.
2. **Autorização**: Sempre valide se o usuário está autenticado e tem permissão para a ação.
3. **Tratamento de Erros**: Sempre retorne um objeto padrão `{ success: true, data: ... }` ou `{ success: false, error: ... }` em vez de deixar a action lançar erros brutos para o cliente.

### Exemplo Recomendado:
```ts
"use server";

import { z } from "zod";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
});

export async function createPost(formData: z.infer<typeof createPostSchema>) {
  try {
    // 1. Autorização
    const session = await getSession();
    if (!session || !session.user) {
      return { success: false, error: "Não autorizado" };
    }

    // 2. Validação dos dados
    const parsed = createPostSchema.parse(formData);

    // 3. Execução da lógica
    const post = await db.posts.create({
      data: {
        ...parsed,
        authorId: session.user.id,
      },
    });

    return { success: true, data: post };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Dados inválidos", details: error.flatten() };
    }
    console.error("[ACTION_ERROR]:", error);
    return { success: false, error: "Erro ao criar post" };
  }
}
```

---

## 🔒 Segurança Backend

### 1. Injeção de SQL e ORMs
- Nunca construa queries SQL concatenando strings.
- Sempre use ORMs (Prisma, Drizzle) com parâmetros ou parametrized queries.

### 2. Row Level Security (RLS)
- Ao usar bancos de dados como Supabase, certifique-se de que as RLS Policies estão ativas em todas as tabelas.

### 3. Sanitização de Inputs
- Sanitizar inputs HTML com bibliotecas como `dompurify` ou `isomorphic-dompurify` no servidor antes de salvar ou renderizar dados.

---

## 🚀 Performance e Caching

### 1. Caching e Revalidação (`revalidatePath`, `revalidateTag`)
- Use `revalidatePath` ou `revalidateTag` em Server Actions após modificar dados no banco para limpar o cache da página.
```ts
import { revalidatePath } from "next/cache";
// Após atualização bem sucedida:
revalidatePath("/posts");
```

### 2. Fetching Otimizado
- Use cache e batching padrão do Next.js fetch.
- Se usar Prisma ou Drizzle em Server Components, envolva a chamada em `cache()` do React se precisar reutilizar os dados em múltiplos componentes na mesma requisição.
```ts
import { cache } from "react";
export const getCachedUser = cache(async (id: string) => {
  return await db.user.findUnique({ where: { id } });
});
```
