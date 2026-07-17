# Padrões de Código — Portal Anasps

> Arquivo de referência com exemplos de código. Consulte quando precisar verificar o padrão correto.

---

## SOLID

### S — Single Responsibility

```tsx
// ✅ BOM — cada arquivo com uma responsabilidade
// services/posts.ts        → CRUD de posts
// hooks/usePagination.ts   → lógica de paginação
// utils/validCPF.ts        → validação de CPF

// ❌ RUIM — misturar responsabilidades
// utils/helpers.ts → validação + formatação + API calls
```

### O — Open/Closed

```tsx
// ✅ BOM — extensível via props
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

// ❌ RUIM — hardcoded, requer modificação para cada uso
function PageHeader() {
  return <h1>Título Fixo</h1>;
}
```

### I — Interface Segregation

```tsx
// ✅ BOM — interfaces segregadas
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

interface ModalWithActionsProps extends ModalProps {
  onConfirm: () => void;
  confirmText?: string;
}

// ❌ RUIM — interface inchada com dezenas de props opcionais
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  variant?: string;
  // ... 20 props mais
}
```

### D — Dependency Inversion

```tsx
// ✅ BOM — componente depende de abstração (hook/service)
function PostList() {
  const { posts, loading } = usePosts();
  return <div>{posts.map(...)}</div>;
}

// ❌ RUIM — componente acoplado ao Supabase
function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    supabase.from('posts').select('*').then(({ data }) => setPosts(data));
  }, []);
}
```

---

## Clean Code

### Nomes Descritivos

```tsx
// ✅ BOM
const isAssociadoValid = await validateAssociado(cpf);
const formattedPhone = formatPhone(rawPhone);

// ❌ RUIM
const x = await check(c);
const fp = fmt(rp);
```

### Early Return

```tsx
// ✅ BOM
function handleClick(link: string | null) {
  if (!link) return setResponseData(null);
  router.push(link);
}

// ❌ RUIM
function handleClick(link: string | null) {
  if (link) {
    router.push(link);
  } else {
    setResponseData(null);
  }
}
```

### Tipagem Estrita

```tsx
// ✅ BOM — tipagem explícita
interface ResponseData {
  msg: string;
  textbtn: string | null;
  link: string | null;
  bottonCancelar: boolean;
}

// ❌ PROIBIDO
const data: any = response.data;
const result = something as unknown as SomeType;
```

---

## SSR vs Client Components

```tsx
// ✅ BOM — Server Component por padrão (sem "use client")
export default async function PostsPage() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}

// ✅ OK — Client Component apenas quando necessário (hooks, eventos)
"use client";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

// ❌ RUIM — "use client" desnecessário em página sem interatividade
"use client";
export default function AboutPage() {
  return <div><h1>Sobre nós</h1><p>Texto estático</p></div>;
}
```

---

## Importações

```tsx
// ✅ BOM — apenas imports utilizados
import { useState } from "react";
import { Button } from "@/components/ui/Button";

// ❌ RUIM — imports não utilizados
import { useState, useEffect, useCallback } from "react"; // useEffect e useCallback não usados
import { Button, Card, Modal } from "@/components/ui"; // Card e Modal não usados
```
